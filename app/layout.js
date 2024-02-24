import "./globals.css";

import Header from "@/components/Header";

export const metadata = {
  title: "🕹️ Andrew Paxson",
  description: "I like to make things for creative people.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="flex-row justify-center items-center">{children}</main>
      </body>
    </html>
  );
}
