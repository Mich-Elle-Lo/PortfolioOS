import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Michelle Lo | Portfolio",
  description:
    "Welcome to Michelle Lo's portfolio, a unique MAC OS clone showcasing projects and skills in web development with JavaScript, React, and Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
