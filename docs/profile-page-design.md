# プロフィールページ設計書

## 概要

プロフィールページは、運営者やメンバーの自己紹介・経歴・スキルなどを紹介するページです。2026/01/24時点で、カード型・中央寄せ・円形画像・自己紹介文強調のデザインに刷新されています。

---

## 1. 対象ファイル

| ファイル | 役割 |
# プロフィールページ設計書（/profile）

## 構成
- タイトル「自己紹介」
- プロフィールカード（画像・名前・役職・冒頭文）
- 学習中のスキル（HTML/CSS/TypeScript/Next.js 各アイコン付き）

## 特徴
- 1人分のみ表示
- スキルはグリッドでアイコン＋ラベル
└──────────────────────────────┘
```

---

## 3. デザイン仕様

- 全体を中央寄せ（flex+min-height:70vh）
- カード型（半透明白・ガラス風・角丸24px・影）
- 画像は円形＋影＋中央寄せ
- 名前は2rem太字・役職はサブカラー
- 自己紹介文は行間広め・中央揃え
- レスポンシブでモバイル時は余白縮小

---

## 4. サンプル実装

### app/profile/page.tsx
```tsx
import Image from "next/image";
import { getProfileList } from "@/app/_libs/microcms";
import { PROFILE_LIST_LIMIT } from "@/app/_constants";
import styles from "./page.module.css";

export default async function Page() {
  const data = await getProfileList({ limit: PROFILE_LIST_LIMIT });
  if (data.contents.length === 0) {
    return <div className={styles.profileSection}><p className={styles.empty}>プロフィール情報を準備中です。</p></div>;
  }
  // 1人目のみ表示（1人用プロフィール想定）
  const member = data.contents[0];
  return (
    <section className={styles.profileSection}>
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
          <div className={styles.profileText}>{member.profile}</div>
        </div>
      </div>
    </section>
  );
}
```

### app/profile/page.module.css
```css
.profileSection {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 40px 0;
}

.profileCard {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(30,60,114,0.15);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  width: 100%;
}

.profileImageWrapper {
  margin-bottom: 24px;
}

.profileImage {
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(30,60,114,0.18);
}

.profileName {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1e3c72;
}

.profilePosition {
  font-size: 1.1rem;
  color: #6ba3d4;
  margin-bottom: 16px;
}

.profileText {
  font-size: 1.1rem;
  line-height: 2;
  color: #222;
  text-align: center;
}

.empty {
  margin-bottom: 40px;
  text-align: center;
  color: #fff;
}

@media (max-width: 600px) {
  .profileCard {
    padding: 24px 8px;
  }
  .profileName {
    font-size: 1.4rem;
  }
}
```

---

## 5. データフロー

- microCMSのProfile APIから1件取得
- 画像・名前・役職・プロフィール文を表示

---

## 6. 今後の拡張案

- [ ] 複数人プロフィール対応
- [ ] SNSリンク・スキルバッジ表示
- [ ] アニメーション追加
- [ ] ダークモード対応

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026/01/24 | カード型・中央寄せ・円形画像デザインに刷新 |
