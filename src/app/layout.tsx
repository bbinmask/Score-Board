import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "@/components/container/Sidebar";
import StoreProvider from "@/store/StoreProvider";
import { Urbanist, Poppins, Josefin_Sans } from "next/font/google";

const urbanist = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const josefin = Josefin_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Score Board",
  description: "Your own matches score",
  icons: {
    icon: "/img/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Score Board</title>

      <StoreProvider>
        <body
          className={`${urbanist.className} ${josefin.className} ${poppins.className}`}
        >
          <Sidebar />
          <main className="full-body">{children}</main>
        </body>
      </StoreProvider>
    </html>
  );
}
