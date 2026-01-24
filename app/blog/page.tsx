import { getBlogList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import SearchField from '@/app/_components/SearchField';
import { BLOG_LIST_LIMIT } from '@/app/_constants';

export default async function Page() {
  const { contents: news, totalCount } = await getBlogList({
    limit: BLOG_LIST_LIMIT,
    fields: ['id', 'title', 'description', 'content', 'category', 'thumbnail', 'publishedAt', 'createdAt'],
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
