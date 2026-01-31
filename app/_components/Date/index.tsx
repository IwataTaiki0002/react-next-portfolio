import styles from './index.module.css';
import { formatDate } from '@/app/_libs/utils';

type Props = {
  date: string;
};

export default function Date({ date }: Props) {
  return (
    <span className={styles.date}>
      <img src="/clock.svg" alt="" width={16} height={16} className={styles.clockIcon} />
      {formatDate(date)}
    </span>
  );
}
