import Image from "next/image";
import { getProfileList } from "@/app/_libs/microcms";
import { PROFILE_LIST_LIMIT } from "@/app/_constants";
import styles from "./page.module.css";

export default async function Page() {
  const data = await getProfileList({ limit: PROFILE_LIST_LIMIT });
  if (data.contents.length === 0) {
    return (
      <div className={styles.profileSection}>
        <p className={styles.empty}>プロフィール情報を準備中です。</p>
      </div>
    );
  }
  
  // 1人目のみ表示
  const member = data.contents[0];
  const profilePreview = member.profile.substring(0, 150);
  
  return (
    <section className={styles.profileSection}>
      <h2 className={styles.sectionTitle}>自己紹介</h2>
      <div className={styles.profileCard}>
        {member.image && (
          <div className={styles.profileImageWrapper}>
            <Image
              src={member.image.url}
              alt={member.name}
              width={160}
              height={160}
              className={styles.profileImage}
            />
          </div>
        )}
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{member.name}</h1>
          {member.position && (
            <p className={styles.profilePosition}>{member.position}</p>
          )}
          <p className={styles.profilePreview}>{profilePreview}...</p>
        </div>
      </div>
      
      <div className={styles.skillsSection}>
        <h2 className={styles.skillsTitle}>学習中のスキル</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillItem}>
            <Image
              src="/html.png"
              alt="HTML"
              width={64}
              height={64}
              className={styles.skillIcon}
            />
            <span className={styles.skillName}>HTML</span>
          </div>
          <div className={styles.skillItem}>
            <Image
              src="/css.png"
              alt="CSS"
              width={64}
              height={64}
              className={styles.skillIcon}
            />
            <span className={styles.skillName}>CSS</span>
          </div>
          <div className={styles.skillItem}>
            <Image
              src="/typescript.png"
              alt="TypeScript"
              width={64}
              height={64}
              className={styles.skillIcon}
            />
            <span className={styles.skillName}>TypeScript</span>
          </div>
          <div className={styles.skillItem}>
            <Image
              src="/nextjs.png"
              alt="Next.js"
              width={64}
              height={64}
              className={styles.skillIcon}
            />
            <span className={styles.skillName}>Next.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}
