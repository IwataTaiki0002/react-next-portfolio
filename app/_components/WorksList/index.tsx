import type { Work } from '@/app/_libs/microcms';
import WorksItem from '@/app/_components/WorksItem';
import styles from './index.module.css';

type Props = {
  works: Work[];
};

export default function WorksList({ works }: Props) {
  if (works.length === 0) {
    return <p>作品がありません。</p>;
  }

  return (
    <ul className={styles.list}>
      {works.map((work) => (
        <li key={work.id}>
          <WorksItem work={work} />
        </li>
      ))}
    </ul>
  );
}
