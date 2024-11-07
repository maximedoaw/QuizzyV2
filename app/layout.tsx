// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Layout from "./components/Layout/Layout";



export const metadata: Metadata = {
  title: "Quizzy",
  description: "Quizzy is a fullstack web app using Next.JS for create and manage your quizz",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
        <body>
          <Layout>
            {children}
          </Layout>
        </body>
    </html>
  )
}
