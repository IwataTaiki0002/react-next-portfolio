# ブログ（Blog）ページ設計書

## 概要

microCMSの `blog` および `categories` APIを使用したブログ機能の設計仕様書です。記事一覧・詳細・検索・カテゴリフィルタリング機能を提供します。

---
## 1. ディレクトリ構造

```
app/
  blog/
    layout.tsx                  # ブログページ共通レイアウト
    page.tsx                    # ブログ一覧ページ
    [slug]/
      page.tsx                  # ブログ詳細ページ
      page.module.css
    category/
      [id]/
        page.tsx                # カテゴリ別一覧ページ
        p/
          [current]/
            page.tsx            # カテゴリ別ページネーション
    search/
      page.tsx                  # 検索結果ページ
    p/
      [current]/
        page.tsx                # ページネーション
  _components/
    NewsList/                   # 記事一覧コンポーネント
    Article/                    # 記事詳細コンポーネント
    SearchField/                # 検索フィールド
    Category/                   # カテゴリバッジ
    Pagination/                 # ページネーション
```

---
## 2. 型定義

# ブログページ設計書（/blog）

## 構成
- 検索フィールド
- 記事リスト（NewsList：カードグリッド、タイトル・カテゴリ・日付・本文プレビュー）
- ページネーション

## 特徴
- microCMSから記事を取得し、カードで表示
- 検索機能あり
} & MicroCMSListContent;
```

---

## 3. ページ一覧

| ページ | パス | 機能 |
|--------|------|------|
| ブログ一覧 | `/blog` | 全記事を一覧表示（検索フィールド付き） |
| ブログ詳細 | `/blog/[slug]` | 記事の詳細内容を表示 |
| 検索結果 | `/blog/search?q=keyword` | キーワード検索結果 |
| カテゴリ別一覧 | `/blog/category/[id]` | カテゴリでフィルタリング |
| ページネーション | `/blog/p/[current]` | 一覧のページ送り |
| カテゴリページネーション | `/blog/category/[id]/p/[current]` | カテゴリ別のページ送り |

---

## 4. ブログ一覧ページ

### ファイル: `app/blog/page.tsx`

```tsx
import { getBlogList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import SearchField from '@/app/_components/SearchField';
import { BLOG_LIST_LIMIT } from '@/app/_constants';

export default async function Page() {
  const { contents: news, totalCount } = await getBlogList({
    limit: BLOG_LIST_LIMIT,
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
```

### 表示要件
- 検索フィールドを最上部に配置
- 記事一覧をカードグリッド形式で表示
- ページネーションでページ送り
- 1ページあたり `BLOG_LIST_LIMIT`（10件）

---

## 5. ブログ詳細ページ

### ファイル: `app/blog/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import { getBlogDetail } from '@/app/_libs/microcms';
import Article from '@/app/_components/Article';
import ButtonLink from '@/app/_components/ButtonLink';
import styles from './page.module.css';

export default async function Page({ params, searchParams }) {
  const data = await getBlogDetail(params.slug, {
    draftKey: searchParams?.dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/blog">ブログ一覧へ</ButtonLink>
      </div>
    </>
  );
}
```

### 表示要件
- タイトル（h1）
- 概要文
- カテゴリバッジ＋投稿日時
- サムネイル画像（あれば）
- リッチテキストコンテンツ
- 一覧へ戻るボタン

---

## 6. 検索・カテゴリ・ページネーション

- 検索ページ `/blog/search` で全文検索
- カテゴリ別一覧 `/blog/category/[id]` でカテゴリ絞り込み
- ページ送り `/blog/p/[current]` でオフセット表示
- それぞれ NewsList＋Pagination で表示

---

## 7. NewsList（記事一覧コンポーネント）

- 記事をカードグリッドで表示
- サムネイル・タイトル・概要・カテゴリ・日付
- ホバーでカード浮き上がり・画像拡大
- レスポンシブ対応

---

## 8. データフロー

```
┌──────────────────────────────┐
│  microCMS Blog API           │
└────────────┬─────────────────┘
             │
             ├─→ getBlogList()
             │   ├─ 一覧ページ
             │   ├─ 検索ページ (q)
             │   └─ カテゴリページ (filters)
             │
             └─→ getBlogDetail()
                 └─ 詳細ページ (draftKey対応)
```

---

## 9. スタイル仕様

- 全体：青グラデ背景（body）
- カード：半透明・角丸・影・白文字
- セクション：白背景・角丸
- フッター：白文字

---

## 10. 今後の拡張案

- [ ] タグ機能の追加
- [ ] 関連記事の表示
- [ ] 記事のシェアボタン
- [ ] コメント機能
- [ ] お気に入り機能
- [ ] 人気記事ランキング
- [ ] RSS/Atom フィード
- [ ] カテゴリ一覧ページ

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026/01/24 | カードグリッド型デザイン・青グラデ背景に刷新 |
