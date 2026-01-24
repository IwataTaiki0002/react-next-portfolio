import Link from 'next/link';
import Image from 'next/image';
import type { Work } from '@/app/_libs/microcms';
import Date from '@/app/_components/Date';
import styles from './index.module.css';

type Props = {
  work: Work;
};

export default function WorksItem({ work }: Props) {
  const imageSrc = work.thumbnail?.url ?? '/no-image.png';

  return (
    <Link href={`/works/${work.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={work.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{work.name}</h3>
        <Date date={work.date} />
      </div>
    </Link>
  );
}
