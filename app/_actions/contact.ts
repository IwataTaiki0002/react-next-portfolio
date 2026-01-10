"use server";

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function createContactData(_prevState: any, formData: FormData) {
  // formのname属性ごとにformData.get()で値を取り出すことができる
  const rawFormData = {
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  if (!rawFormData.lastname) {
    return {
      status: "error",
      message: "姓を入力してください",
    };
  }
  if (!rawFormData.firstname) {
    return {
      status: "error",
      message: "名を入力してください",
    };
  }
  if (!rawFormData.company) {
    return {
      status: "error",
      message: "会社名を入力してください",
    };
  }
  if (!rawFormData.email) {
    return {
      status: "error",
      message: "メールアドレスを入力してください",
    };
  }
  if (!validateEmail(rawFormData.email)) {
    return {
      status: "error",
      message: "メールアドレスの形式が誤っています",
    };
  }
  if (!rawFormData.message) {
    return {
      status: "error",
      message: "メッセージを入力してください",
    };
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    console.error("Missing HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID env vars", {
      portalId,
      formId,
    });
    return { status: "error", message: "フォーム送信設定が不正です" };
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: [
        {
          objectTypeId: "0-1",
          name: "lastname",
          value: rawFormData.lastname,
        },
        {
          objectTypeId: "0-1",
          name: "firstname",
          value: rawFormData.firstname,
        },
        {
          objectTypeId: "0-1",
          name: "company",
          value: rawFormData.company,
        },
        {
          objectTypeId: "0-1",
          name: "email",
          value: rawFormData.email,
        },
        {
          objectTypeId: "0-1",
          name: "message",
          value: rawFormData.message,
        },
      ],
    }),
  });

  // HTTP ステータスが OK でない場合は本文を text として取り出してエラー化
  if (!result.ok) {
    const text = await result.text();
    console.error("HubSpot API returned non-OK status", result.status, text);
    return {
      status: "error",
      message: `送信に失敗しました（status: ${result.status}）`,
    };
  }

  const contentType = result.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      await result.json();
    } catch (e) {
      const text = await result.text().catch(() => "");
      console.error("Failed to parse JSON response from HubSpot", e, text);
      return {
        status: "error",
        message: "お問い合わせに失敗しました（サーバー応答が不正です）",
      };
    }
  } else {
    const text = await result.text().catch(() => "");
    console.error("Expected JSON but got non-JSON response from HubSpot", contentType, text);
    return {
      status: "error",
      message: "サーバーがJSONを返しませんでした",
    };
  }

  return { status: "success", message: "OK" };
}
