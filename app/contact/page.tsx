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
