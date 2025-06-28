"use client";
import "./globals.css";
import Header from "@/components/Header";
import CustomThemeProvider from "@/provider/CustomThemeProvider";

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
