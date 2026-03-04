import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://moodk-entertainment.hsweb.pics"),
  title: "MOOD K ENTERTAINMENT",
  description: "무드케이엔터테인먼트 - 배우 매니지먼트",
  openGraph: {
    title: "MOOD K ENTERTAINMENT",
    description: "Management with Intention",
    siteName: "MOOD K ENTERTAINMENT",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOOD K ENTERTAINMENT",
    description: "Management with Intention",
  },
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
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
