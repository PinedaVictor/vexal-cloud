import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthorizedUI } from "@/components/atomic/templates/AuthorizedUI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vexal",
  description: "AI powered command line utilitiy for software developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthorizedUI>{children}</AuthorizedUI>
      </body>
    </html>
  );
}
