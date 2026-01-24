# お問い合わせ（Contact）ページ設計書

## 概要

Server Actionsを使用したお問い合わせフォームの設計仕様書です。クライアントサイドでフォーム送信を処理し、サーバーサイドでバリデーションを実行します。

---

## 1. ディレクトリ構造

```
app/
  contact/
    layout.tsx              # お問い合わせページ共通レイアウト
    page.tsx                # お問い合わせページ
    page.module.css         # お問い合わせページのスタイル
  _actions/
    contact.ts              # Server Action（フォーム処理）
  _components/
    ContactForm/
      index.tsx             # フォームコンポーネント
      index.module.css      # フォームのスタイル
```

---

## 2. フォームフィールド

| フィールド名 | name属性 | 種類 | 必須 | バリデーション |
|------------|---------|------|------|--------------|
| 姓 | `lastname` | text | ✅ | 空チェック |
| 名 | `firstname` | text | ✅ | 空チェック |
| 会社名・組織名 | `company` | text | - | - |
| メールアドレス | `email` | text | ✅ | 形式チェック |
| メッセージ | `message` | textarea | ✅ | 空チェック |

---

## 3. ページ構成

```
┌─────────────────────────────────────┐
│  Hero Section                       │
│  - タイトル: Contact                │
│  - サブタイトル: お問い合わせ        │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Sheet Container                    │
│  ┌───────────────────────────────┐  │
│  │  説明文                       │  │
│  │  「ご質問やお仕事のご相談...」│  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  Contact Form                 │  │
│  │  - 姓・名（横並び）           │  │
│  │  - 会社名                     │  │
│  │  - メールアドレス             │  │
│  │  - メッセージ                 │  │
│  │  - 送信ボタン                 │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 4. お問い合わせページ

### ファイル: `app/contact/page.tsx`

```tsx
import ContactForm from "@/app/_components/ContactForm";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        ご質問やお仕事のご相談は下記フォームよりお気軽にお問い合わせください。
        <br />
        内容確認後、できるだけ早くご返信いたします。
      </p>
      <ContactForm />
    </div>
  );
}
```

### 表示要件

- 説明文を上部に配置
- フォームを中央に配置
- シンプルで分かりやすいレイアウト

---

## 5. レイアウト

### ファイル: `app/contact/layout.tsx`

```tsx
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

export const metadata = {
  title: "お問い合わせ｜ポートフォリオサイト",
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Contact" sub="お問い合わせ" />
      <Sheet>{children}</Sheet>
    </>
  );
}
```

**構成**
- `Hero`: タイトル「Contact」とサブタイトル「お問い合わせ」
- `Sheet`: 白背景のコンテンツコンテナ
- `metadata`: ページタイトルの設定

---

## 6. ContactForm コンポーネント

### ファイル: `app/_components/ContactForm/index.tsx`

```tsx
"use client";

import { createContactData } from "@/app/_actions/contact";
import { useFormState } from "react-dom";
import styles from "./index.module.css";

const initialState = {
  status: "",
  message: "",
};

export default function ContactForm() {
  const [state, formAction] = useFormState(createContactData, initialState);
  
  if (state.status === "success") {
    return (
      <p className={styles.success}>
        お問い合わせいただき、ありがとうございます。
        <br />
        内容を確認次第、ご連絡させていただきます。
      </p>
    );
  }
  
  return (
    <form className={styles.form} action={formAction}>
      {/* フォームフィールド */}
      <div className={styles.actions}>
        {state.status === "error" && (
          <p className={styles.error}>{state.message}</p>
        )}
        <input type="submit" value="送信する" className={styles.button} />
      </div>
    </form>
  );
}
```

### 機能

**状態管理**
- `useFormState`: Server Actionの状態管理
- `initialState`: 初期状態（status: "", message: ""）

**条件分岐**
- `status === "success"`: 送信完了メッセージを表示
- `status === "error"`: エラーメッセージを表示
- それ以外: フォームを表示

**フォーム送信**
- `action={formAction}`: Server Actionを実行
- JavaScriptが無効でも動作（Progressive Enhancement）

---

## 7. Server Action

### ファイル: `app/_actions/contact.ts`

```typescript
"use server";

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function createContactData(_prevState: any, formData: FormData) {
  const rawFormData = {
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  // バリデーション
  if (!rawFormData.lastname) {
    return { status: "error", message: "姓を入力してください" };
  }
  if (!rawFormData.firstname) {
    return { status: "error", message: "名を入力してください" };
  }
  if (!rawFormData.email) {
    return { status: "error", message: "メールアドレスを入力してください" };
  }
  if (!validateEmail(rawFormData.email)) {
    return { status: "error", message: "メールアドレスの形式が誤っています" };
  }
  if (!rawFormData.message) {
    return { status: "error", message: "メッセージを入力してください" };
  }

  // microCMS APIへの送信処理
  // （実装が必要）

  return { status: "success", message: "" };
}
```

### バリデーションルール

| フィールド | ルール |
|-----------|--------|
| 姓 | 必須（空チェック） |
| 名 | 必須（空チェック） |
| 会社名 | 任意 |
| メールアドレス | 必須 + 形式チェック |
| メッセージ | 必須（空チェック） |

### メールアドレス形式チェック

```typescript
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

基本的なメールアドレスの形式を検証

---

## 8. データフロー

```
┌──────────────────────┐
│  ContactForm         │
│  (Client Component)  │
└──────┬───────────────┘
       │ formAction
       │
       ▼
┌──────────────────────┐
│  createContactData   │
│  (Server Action)     │
├──────────────────────┤
│  1. FormData取得     │
│  2. バリデーション   │
│  3. API送信          │
│  4. 結果を返す       │
└──────┬───────────────┘
       │ { status, message }
       │
       ▼
┌──────────────────────┐
│  ContactForm         │
│  状態による表示切替  │
└──────────────────────┘
```

---

## 9. レスポンス形式

### 成功時

```typescript
{
  status: "success",
  message: ""
}
```

### エラー時

```typescript
{
  status: "error",
  message: "エラーメッセージ"
}
```

---

## 10. スタイル仕様

### フォームレイアウト

| 要素 | スタイル |
|------|---------|
| 姓・名 | 横並び（`.horizontal`） |
| その他のフィールド | 縦並び |
| ラベル | 上部配置 |
| 送信ボタン | 右寄せまたは中央 |

### 状態表示

| 状態 | スタイル |
|------|---------|
| エラーメッセージ | 赤文字（`.error`） |
| 成功メッセージ | 緑または青（`.success`） |

---

## 11. アクセシビリティ

### label と input の関連付け

```tsx
<label htmlFor="email">メールアドレス</label>
<input type="text" id="email" name="email" />
```

`htmlFor` と `id` を一致させることで、スクリーンリーダーに対応

### セマンティックHTML

- `<form>`: フォームのセマンティクス
- `<label>`: フィールドのラベル
- `<input type="submit">`: 送信ボタン

---

## 12. Progressive Enhancement

### JavaScriptなしでも動作

Server Actionsは、JavaScriptが無効な環境でも動作します。

- フォーム送信時にページがリロードされる
- Server Actionが実行される
- 結果がサーバーサイドレンダリングで表示される

---

## 13. 今後の実装

### microCMS APIへの送信

```typescript
const response = await fetch(
  `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/contact`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!,
    },
    body: JSON.stringify(rawFormData),
  }
);
```

### メール送信

- SendGrid、AWS SES、Resendなどのサービスを利用
- サーバー側で送信処理を実行

---

## 14. セキュリティ対策

### CSRF対策

Next.jsのServer Actionsは、自動的にCSRFトークンを生成・検証

### XSS対策

ユーザー入力は適切にエスケープされる

### レート制限

実装が必要（例: 1分間に3回まで）

---

## 15. エラーハンドリング

### ネットワークエラー

```typescript
try {
  // API送信処理
} catch (error) {
  return {
    status: "error",
    message: "送信に失敗しました。しばらく経ってから再度お試しください。"
  };
}
```

### バリデーションエラー

各フィールドごとに適切なエラーメッセージを表示

---

## 16. 今後の拡張案

- [ ] reCAPTCHA の実装
- [ ] ファイル添付機能
- [ ] 自動返信メール
- [ ] お問い合わせ番号の発行
- [ ] お問い合わせ履歴の管理画面
- [ ] Slack通知連携
- [ ] レート制限の実装
- [ ] フィールドごとのエラー表示

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026/01/24 | 初版作成 |
