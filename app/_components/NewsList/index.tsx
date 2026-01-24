import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';
import Category from '../Category';
import Date from '../Date';
import { Blog } from '@/app/_libs/microcms';

type Props = {
  news: Blog[];
};

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p>記事がありません。</p>;
  }
  
  // HTMLタグを除去してプレーンテキストに変換
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };
  
  return (
    <div className={styles.grid}>
      {news.map((article) => {
        const contentPreview = stripHtml(article.content).substring(0, 150);
        
        return (
          <article key={article.id} className={styles.card}>
            <Link href={`/blog/${article.id}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                {article.thumbnail ? (
                  <Image
                    src={article.thumbnail.url}
                    alt=""
                    className={styles.image}
                    width={article.thumbnail.width}
                    height={article.thumbnail.height}
                  />
                ) : (
                  <Image
                    className={styles.image}
                    src="/no-image.png"
                    alt="No Image"
                    width={1200}
                    height={630}
                  />
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{article.title}</h3>
                {contentPreview && (
                  <p className={styles.contentPreview}>
                    {contentPreview}...
                  </p>
                )}
                <div className={styles.meta}>
                  <Category category={article.category} />
                  <Date date={article.publishedAt ?? article.createdAt} />
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
