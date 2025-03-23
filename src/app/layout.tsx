import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Importa authOptions.
import SessionWrapper from "./SessionWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import "./globals.css";

// Define os metadados da aplicação.
export const metadata: Metadata = {
  title: "Ella",
  description: "Bolsas",
};

// Lista de rotas protegidas.
const protectedRoutes = ["/add-bag"]; // Adicione mais rotas conforme necessário.

// Componente RootLayout que define a estrutura básica da aplicação.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obtém a sessão do usuário no servidor.
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {/* Envolve a aplicação com o SessionWrapper para gerenciar a sessão do usuário. */}
        <SessionWrapper session={session}>
          {/* Renderiza a barra de navegação (Navbar). */}
          <Navbar />
          {/* Renderiza o conteúdo principal da página. */}
          <div>{children}</div>
          {/* Renderiza o rodapé (Footer). */}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}