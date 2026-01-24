import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href="/blog">ブログ</Link>
          </li>
          <li className={styles.item}>
            <Link href="/works">作品</Link>
          </li>
          <li className={styles.item}>
            <Link href="/profile">プロフィール</Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.cr}>© Portfolio Site. All Rights Reserved 2026</p>
    </footer>
  );
}
