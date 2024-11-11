import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import {
  METADATA_DEFAULT_TITLE,
  METADATA_DESCRIPTION,
  METADATA_ICON_PATH,
  METADATA_KEYWORDS,
  METADATA_OPEN_GRAPH_IMAGES,
  METADATA_OPEN_GRAPH_LOCALE,
  METADATA_OPEN_GRAPH_TITLE,
  METADATA_TITLE_TEMPLATE,
} from "@constants/metadata";

const BCSC_MAIN_FONT = localFont({
  src: "./fonts/Kamerik-105-W00-Bold.ttf",
});

export const metadata: Metadata = {
  title: {
    template: METADATA_TITLE_TEMPLATE,
    default: METADATA_DEFAULT_TITLE,
  },
  description: METADATA_DESCRIPTION,
  keywords: METADATA_KEYWORDS,
  icons: {
    icon: METADATA_ICON_PATH,
  },
  openGraph: {
    title: METADATA_DEFAULT_TITLE,
    description: METADATA_DESCRIPTION,
    siteName: METADATA_OPEN_GRAPH_TITLE,
    locale: METADATA_OPEN_GRAPH_LOCALE,
    images: METADATA_OPEN_GRAPH_IMAGES,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${BCSC_MAIN_FONT.className}`}>{children}</body>
    </html>
  );
}
