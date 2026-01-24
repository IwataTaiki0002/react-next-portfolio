"use client";
import { ReactNode } from "react";

export default function GradientBgClickCatcher({ onBgClick }: { onBgClick: () => void }) {
  // bodyのグラデーション部分だけをカバーする
  // z-index: -1 でHeaderやFooter、コンテンツより下
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "auto",
      }}
      aria-hidden="true"
      onClick={onBgClick}
    />
  );
}
