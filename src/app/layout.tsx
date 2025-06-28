"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CustomThemeProvider from "@/provider/CustomThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Payslip Generator",
//   keywords: ["Payslip", "Generator", "Payroll", "Salary"],
//   description: "Generate payslips on the go with in browser.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>
          <Header />
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
