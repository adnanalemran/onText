import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/provider/QueryProvider";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "onTask",
  description: "a product of innerlab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav> Home </nav>
       <nav> Add task </nav>
    
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
