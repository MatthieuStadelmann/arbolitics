import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Providers } from "./providers";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: "Arbolitics",
  description: "Arbolitics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${manrope.variable} h-full antialiased`}>
        <Providers>
          <div className="flex h-full flex-col">
            <NavBar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
