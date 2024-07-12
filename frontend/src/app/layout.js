import { Inter } from "next/font/google";
import QueryProvider from "./components/provider/QueryProvider";
import "./globals.css";
import Navbar from "./components/provider/Shared/Navbar";
 
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "onTask",
  description: "a product of innerlab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Navbar />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
