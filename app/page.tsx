import styles from "./page.module.css";
import Image from "next/image";

import { getBlogList } from "@/app/_libs/microcms";
import { TOP_BLOG_LIMIT } from "@/app/_constants";
import NewsList from "@/app/_components/NewsList";
import ButtonLink from "@/app/_components/ButtonLink";

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
            エンジニアを目指して学習中です。
            <br />
            制作物や学びの記録を発信しています。
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
      <section className={styles.blog}>
        <h2 className={styles.newsTitle}>最新の記事</h2>
        <NewsList news={data.contents} />
        <div className={styles.blogLink}>
          <ButtonLink href="/blog">記事一覧を見る</ButtonLink>
        </div>
      </section>
    </>
  );
}
