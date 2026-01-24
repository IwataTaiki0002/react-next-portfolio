import styles from './index.module.css';
import KamomeArea from '@/app/_components/KamomeArea';

type Props = {
  title: string;
  sub: string;
};

export default function Hero({ title, sub }: Props) {
  return (
    <KamomeArea className={styles.container}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{sub}</p>
      </div>
    </KamomeArea>
  );
}
