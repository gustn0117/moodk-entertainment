import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOOD K ENTERTAINMENT",
  description: "무드케이엔터테인먼트 - 배우 매니지먼트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
