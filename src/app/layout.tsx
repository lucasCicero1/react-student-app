import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import NextAuthSessionProvider from "@/src/providers/sessionProvider";
import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased dark:bg-gray-950",
          fontSans.variable,
        )}
      >
        <NextAuthSessionProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="h-screen flex">{children}</div>
          </Providers>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
