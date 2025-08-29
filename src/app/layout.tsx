import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Blog Impacta",
  description: "Projeto de conclusão de curso 2025s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <div className="main">
          <Header></Header>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
