import Link from 'next/link';
import styles from './index.module.css';
import Menu from '../Menu';
import ThemeToggle from '../ThemeToggle';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        {/* ロゴ画像削除済み */}
      </Link>
      <div className={styles.headerRight}>
        <ThemeToggle />
        <Menu />
      </div>
    </header>
  );
}
