import "./globals.css";

export const metadata = {
  title: "🕹️ Andrew Paxson",
  description: "I like to make things for creative people.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="bg-slate-50 text-slate-700 max-w-3xl mx-auto py-20 px-4 "
    >
      <body>
        <main className="flex flex-col">{children}</main>
      </body>
    </html>
  );
}
