# 作品（Works）ページ設計書

## 概要

microCMSの `works` APIを使用した作品一覧・詳細ページの設計仕様書です。

---

## 1. APIスキーマ

| フィールドID | 名前 | 種類 | 必須 |
|-------------|------|------|------|
| `date` | 日付 | date | ✅ |
| `name` | 名前 | text | ✅ |
| `link_url` | リンクURL | text | - |
| `thumbnail` | サムネイル画像 | media | - |
| `content` | 作品紹介文 | richEditorV2 | ✅ |

---

## 2. ディレクトリ構造

```
app/
  works/
    layout.tsx              # 作品ページ共通レイアウト
    page.tsx                # 作品一覧ページ
    [slug]/
      page.tsx              # 作品詳細ページ
      page.module.css
    p/
      [current]/
        page.tsx            # ページネーション対応
  _components/
    WorksList/
      index.tsx             # 作品一覧コンポーネント
      index.module.css
    WorksItem/
      index.tsx             # 作品カードコンポーネント
      index.module.css
```

---

## 3. 型定義

### Work型（microcms.ts に追加）

```typescript
export type Work = {
  date: string;              // 日付（必須）
  name: string;              // 名前（必須）
  link_url?: string;         // リンクURL（任意）
  thumbnail?: MicroCMSImage; // サムネイル画像（任意）
  content: string;           // 作品紹介文（必須・リッチエディタ）
} & MicroCMSListContent;
```

---

## 4. API関数

### 作品一覧取得

```typescript
export const getWorksList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Work>({
    endpoint: 'works',
    queries,
  });
  return listData;
};
```

### 作品詳細取得

```typescript
export const getWorksDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Work>({
    endpoint: 'works',
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};
```

---

## 5. ページ一覧

| ページ | パス | 機能 |
|--------|------|------|
| 作品一覧 | `/works` | サムネイル付きカード形式で作品を一覧表示 |
| 作品詳細 | `/works/[slug]` | 作品名、日付、紹介文、外部リンクを表示 |
| ページネーション | `/works/p/[current]` | 一覧のページ送り |

---

## 6. 作品一覧ページ

### ファイル: `app/works/page.tsx`

```tsx
import { getWorksList } from '@/app/_libs/microcms';
import WorksList from '@/app/_components/WorksList';
import Pagination from '@/app/_components/Pagination';
import { WORKS_LIST_LIMIT } from '@/app/_constants';

export default async function Page() {
  const { contents: works, totalCount } = await getWorksList({
    limit: WORKS_LIST_LIMIT,
  });

  return (
    <>
      <WorksList works={works} />
      <Pagination totalCount={totalCount} basePath="/works" />
    </>
  );
}
```

### 表示要件

- カード形式のグリッドレイアウト
- 各カードにサムネイル画像、作品名、日付を表示
- サムネイルがない場合はプレースホルダー画像を表示
- クリックで詳細ページへ遷移

---

## 7. 作品詳細ページ

### ファイル: `app/works/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import { getWorksDetail } from '@/app/_libs/microcms';
import ButtonLink from '@/app/_components/ButtonLink';
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
      {data.thumbnail && (
        <img
          src={data.thumbnail.url}
          alt={data.name}
          className={styles.thumbnail}
        />
      )}
      <h1 className={styles.title}>{data.name}</h1>
      <time className={styles.date}>{data.date}</time>
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
```

### 表示要件

- サムネイル画像（大きく表示）
- 作品名（h1）
- 日付
- 作品紹介文（リッチテキスト）
- 外部リンクボタン（link_urlがある場合のみ）
- 一覧へ戻るボタン

---

## 8. コンポーネント設計

### WorksList

作品一覧を表示するコンテナコンポーネント

```tsx
// app/_components/WorksList/index.tsx
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
```

### WorksItem

個別の作品カードコンポーネント

```tsx
// app/_components/WorksItem/index.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Work } from '@/app/_libs/microcms';
import styles from './index.module.css';

type Props = {
  work: Work;
};

export default function WorksItem({ work }: Props) {
  return (
    <Link href={`/works/${work.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {work.thumbnail ? (
          <Image
            src={work.thumbnail.url}
            alt={work.name}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{work.name}</h3>
        <time className={styles.date}>{work.date}</time>
      </div>
    </Link>
  );
}
```

---

## 9. 定数（_constants/index.ts に追加）

```typescript
export const WORKS_LIST_LIMIT = 6; // 1ページあたりの表示件数
```

---

## 10. ブログページとの比較

| 項目 | Blog | Works |
|------|------|-------|
| カテゴリ | あり | なし |
| 外部リンク | なし | あり（`link_url`） |
| 検索機能 | あり | なし（必要に応じて追加可能） |
| 表示形式 | リスト形式 | カード/グリッド形式 |
| 画像表示 | 小サムネイル | 大きめサムネイル |

---

## 11. 今後の拡張案

- 検索機能の追加
- タグ・カテゴリ機能の追加
- ソート機能（日付順、名前順）
- フィルタリング機能
- OGP画像の自動生成

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026/01/24 | 初版作成 |
