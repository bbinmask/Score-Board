import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "@/components/container/Sidebar";
import StoreProvider from "@/store/StoreProvider";
import { Suspense } from "react";
// import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Score Board",
  description: "Your own matches score",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Score Board</title>
      <link rel="icon" type="image/x-icon" href="/img/logo.png"></link>
      {/* <Suspense fallback={<Loading />}> */}
      <StoreProvider>
        <body className={``}>
          <nav>
            <Sidebar />
          </nav>
          <main className="full-body">{children}</main>
        </body>
      </StoreProvider>
      {/* </Suspense> */}
    </html>
  );
}
