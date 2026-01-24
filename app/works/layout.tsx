import Hero from '@/app/_components/Hero';
import Sheet from '@/app/_components/Sheet';

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function WorksLayout({ children }: Props) {
  return (
    <>
      <Hero title="Works" sub="作品" />
      <Sheet>{children}</Sheet>
    </>
  );
}
