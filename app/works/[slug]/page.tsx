import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getWorksDetail } from '@/app/_libs/microcms';
import ButtonLink from '@/app/_components/ButtonLink';
import Date from '@/app/_components/Date';
import styles from './page.module.css';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const data = await getWorksDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <article className={styles.main}>
      <h1 className={styles.title}>{data.name}</h1>
      <div className={styles.meta}>
        <Date date={data.date} />
      </div>
      <div className={styles.thumbnailWrapper}>
        <Image
          src={data.thumbnail?.url ?? '/no-image.png'}
          alt={data.name}
          fill
          sizes="(max-width: 640px) 100vw, 960px"
          className={styles.thumbnail}
        />
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      {data.link_url && (
        <a
          href={data.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
        >
          作品を見る
        </a>
      )}
      <div className={styles.footer}>
        <ButtonLink href="/works">作品一覧へ</ButtonLink>
      </div>
    </article>
  );
}
