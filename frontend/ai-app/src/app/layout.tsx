import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat App",
  description: "A Next.js AI chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
            }}
          />
          <Navbar>
            {children}
          </Navbar>
        </AuthProvider>
      </body>
    </html>
  );
}
