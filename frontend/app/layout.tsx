"use client";

// import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";
import { usePathname } from "next/navigation";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Obra Social",
//   description: "Saas de Obra Social",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  // const hideComponent = pathname.startsWith("/home-user");

  return (
    <html lang="en">
      <body className={`${sora.variable}  antialiased`}>
        <AuthProvider>
          {/* {!hideComponent && <Navbar />} */}
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
