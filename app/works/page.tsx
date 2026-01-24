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
      <Pagination
        totalCount={totalCount}
        basePath="/works"
        limit={WORKS_LIST_LIMIT}
      />
    </>
  );
}
