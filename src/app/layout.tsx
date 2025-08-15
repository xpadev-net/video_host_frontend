import "@/styles/global.css";
import "@/styles/colors.scss";
import "@/styles/nprogress.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteName } from "@/contexts/env";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: SiteName,
  description: "Japanese home media server frontend",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
