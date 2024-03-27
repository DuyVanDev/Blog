"use client";

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../../context/ThemeContext";
import { AuthProvider } from "../../context/AuthContext";
import Header from "@/components/Header/Header";
import AdminLayout from "@/layout/AdminLayout";
import UserLayout from "@/layout/UserLayout";
import { Footer } from "@/components";
import useStore from "@/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "T-BLOG",
  description: "T-BLOG tin tức cực shock",
};
const layouts = {
  admin: AdminLayout,
  user: UserLayout,
};
export default function RootLayout({ children }) {
  const { theme, isLoading } = useStore();

  return (
    <html lang="en">
      <AuthProvider>
        <body className={theme}>
          <Header />

          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
