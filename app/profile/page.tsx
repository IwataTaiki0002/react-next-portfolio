import Image from "next/image";
import { getProfileList } from "@/app/_libs/microcms";
import { PROFILE_LIST_LIMIT } from "@/app/_constants";
import styles from "./page.module.css";

export default async function Page() {
  const data = await getProfileList({ limit: PROFILE_LIST_LIMIT });
  return (
    <div className={styles.container}>
      {data.contents.length === 0 ? (
        <p className={styles.empty}>プロフィール情報を準備中です。</p>
      ) : (
        <ul>
          {data.contents.map((member) => (
            <li key={member.id} className={styles.list}>
              <Image
                src={member.image.url}
                alt={member.name}
                width={member.image.width}
                height={member.image.height}
                className={styles.image}
              />
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dd className={styles.position}>{member.position}</dd>
                <dd className={styles.profile}>{member.profile}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
