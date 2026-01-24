"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "footer" | "div" | "article" | "main";
};

export default function KamomeArea({ children, className, as: Tag = "section" }: Props) {
  return (
    <Tag className={className} data-kamome-area>
      {children}
    </Tag>
  );
}
