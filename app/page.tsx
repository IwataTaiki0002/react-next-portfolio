import styles from './page.module.css';
import Image from 'next/image';

import { getBlogList } from '@/app/_libs/microcms';
import { TOP_BLOG_LIMIT } from '@/app/_constants';
import NewsList from '@/app/_components/NewsList';
import ButtonLink from '@/app/_components/ButtonLink';

export const revalidate = 60;

export default async function Home() {
  const data = await getBlogList({
    limit: TOP_BLOG_LIMIT,
  });
  return (
    <>
      <section className={styles.top}>
        <div className={styles.taiyakiWrapper}>
          <Image
            src="/taiyaki.png"
            alt="たい焼き"
            width={160}
            height={160}
            className={styles.taiyaki}
            priority
          />
          <h1 className={styles.title}>Welcome to my Portfolio!</h1>
          <p className={styles.description}>
            このサイトでは私の制作物やブログ記事を紹介しています。<br />
          </p>
        </div>
        <Image
          className={styles.bgimg}
          src="/img-mv.jpg"
          alt=""
          width={4000}
          height={1200}
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>blog</h2>
        <NewsList news={data.contents} />
        <div className={styles.newsLink}>
          <ButtonLink href="/blog">もっとみる</ButtonLink>
        </div>
      </section>
    </>
  );
}
