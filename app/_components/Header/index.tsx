import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import Menu from '../Menu';
import ThemeToggle from '../ThemeToggle';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/logo.svg"
          alt="SIMPLE"
          className={styles.logo}
          width={348}
          height={133}
          priority
        />
      </Link>
      <div className={styles.headerRight}>
        <ThemeToggle />
        <Menu />
      </div>
    </header>
  );
}
