import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartazes de filmes e séries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pr-br">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
