"use client";
import { useEffect } from "react";

export default function useKamomeAnimation() {
  useEffect(() => {
    const fire = () => {
      // 画面サイズ取得
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // ダークモードかどうか判定
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      
      let startX, startY, dx, dy;
      
      if (isDark) {
        // ダークモード: hoshi.png が上端/右端から左下へ
        if (Math.random() < 0.5) {
          // 上端（左右全体）
          startX = Math.random() * (vw - 40);
          startY = -40;
        } else {
          // 右端（上下全体）
          startX = vw;
          startY = Math.random() * (vh - 40);
        }
        // 左下方向へ移動
        const maxDist = Math.max(startX + 120, vh - startY + 120);
        dx = -maxDist;
        dy = maxDist;
      } else {
        // ライトモード: kamome.png が右端/下端から左上へ
        if (Math.random() < 0.5) {
          // 右端（上下全体）
          startY = Math.random() * (vh - 80);
          startX = vw - 80;
        } else {
          // 下端（左右全体）
          startX = Math.random() * (vw - 80);
          startY = vh - 80;
        }
        // 左上方向へ移動
        const maxDist = Math.max(startX + 120, startY + 120);
        dx = -maxDist;
        dy = -maxDist;
      }
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.7; // px/ms
      const duration = distance / speed;

      // 要素生成
      const element = document.createElement("img");
      element.src = isDark ? "/hoshi.png" : "/kamome.png";
      element.alt = isDark ? "星" : "カモメ";
      element.style.position = "fixed";
      element.style.left = `${startX}px`;
      element.style.top = `${startY}px`;
      element.style.width = isDark ? "40px" : "80px";
      element.style.height = isDark ? "40px" : "80px";
      element.style.pointerEvents = "none";
      element.style.zIndex = "-1";
      element.style.transition = `transform ${duration}ms linear`;
      // ダークモード: 左回転（-360度以上）、ライトモード: 少し回転
      element.style.transform = isDark ? "translate(0,0) rotate(0deg)" : "translate(0,0) rotate(-10deg)";
      element.style.opacity = "1";

      document.body.appendChild(element);

      // アニメーション開始（次フレームで）
      requestAnimationFrame(() => {
        // ダークモード: 左回転しながら移動、ライトモード: 少し回転
        const rotation = isDark ? -720 : -40;
        element.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`;
      });

      // アニメーション後に削除
      setTimeout(() => {
        element.remove();
      }, duration + 100);
    };
    window.addEventListener("kamome-fire", fire);
    return () => window.removeEventListener("kamome-fire", fire);
  }, []);
  return null;
}
