import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techrar Technical Assessment",
  description: "Techrar Technical Assessment",
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
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
          <Navbar>
            {children}
          </Navbar>
          <Link href="/tickets">
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-violet-600 rounded-full p-6 shadow-lg hover:bg-violet-700 transition-all hover:scale-125 duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
          </Link>
        </AuthProvider>
      </body>
    </html>
  );
}
