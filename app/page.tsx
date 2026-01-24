import styles from "./page.module.css";
import Image from "next/image";

import { getBlogList, getWorksList, getProfileList } from "@/app/_libs/microcms";
import { TOP_BLOG_LIMIT, TOP_WORKS_LIMIT } from "@/app/_constants";
import NewsList from "@/app/_components/NewsList";
import WorksList from "@/app/_components/WorksList";
import ButtonLink from "@/app/_components/ButtonLink";
import KamomeArea from "@/app/_components/KamomeArea";

export const revalidate = 60;

export default async function Home() {
  const [blogData, worksData, profileData] = await Promise.all([
    getBlogList({ limit: TOP_BLOG_LIMIT }),
    getWorksList({ limit: TOP_WORKS_LIMIT }),
    getProfileList({ limit: 1 }),
  ]);
  
  const profile = profileData.contents[0];
  
  // HTMLタグを除去してプレーンテキストに変換
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };
  
  const profilePreview = profile?.profile ? stripHtml(profile.profile).substring(0, 120) : "";

  return (
    <>
      <KamomeArea className={styles.top}>
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
      </KamomeArea>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.sectionDescription}>
            プロフィールや経歴について紹介しています。
          </p>
          {profile && (
            <div className={styles.profilePreview}>
              {profile.image && (
                <Image
                  src={profile.image.url}
                  alt={profile.name}
                  width={100}
                  height={100}
                  className={styles.profileImage}
                />
              )}
              <div className={styles.profileContent}>
                <h3 className={styles.profileName}>{profile.name}</h3>
                {profile.position && (
                  <p className={styles.profilePosition}>{profile.position}</p>
                )}
                <p className={styles.profileText}>{profilePreview}...</p>
              </div>
            </div>
          )}
          <div className={styles.sectionLink}>
            <ButtonLink href="/profile">プロフィールを見る</ButtonLink>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Works</h2>
          <p className={styles.sectionDescription}>
            制作したWebアプリやデザイン作品を紹介しています。
          </p>
          <WorksList works={worksData.contents} />
          <div className={styles.sectionLink}>
            <ButtonLink href="/works">作品一覧を見る</ButtonLink>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Blog</h2>
          <p className={styles.sectionDescription}>
            技術記事や日々の学び・お知らせを掲載しています。
          </p>
          <NewsList news={blogData.contents} />
          <div className={styles.sectionLink}>
            <ButtonLink href="/blog">記事一覧を見る</ButtonLink>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.sectionDescription}>
            お問い合わせはこちらから受け付けています。
          </p>
          <div className={styles.profilePreview}>
            <Image
              src="/mail.png"
              alt="お問い合わせ"
              width={100}
              height={100}
              className={styles.profileImage}
            />
            <div className={styles.profileContent}>
              <h3 className={styles.profileName}>お問い合わせ</h3>
              <p className={styles.profileText}>
                ご質問やお仕事のご相談は、お問い合わせフォームからお気軽にご連絡ください。内容を確認次第、できるだけ早くご返信いたします。
              </p>
            </div>
          </div>
          <div className={styles.sectionLink}>
            <ButtonLink href="/contact">お問い合わせ</ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
