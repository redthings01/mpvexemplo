import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { compare } from "bcryptjs";
import { User } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Configuração das opções de autenticação.
export const authOptions = {
  providers: [
    // Provedor de autenticação por credenciais (email e senha).
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        // Busca o usuário no banco de dados.
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Usuário não encontrado");

        // Verifica se a senha está correta.
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Senha inválida");

        // Retorna o usuário autenticado.
        return { id: user.id.toString(), email: user.email, role: user.role } as User;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para criptografia.
  callbacks: {
    // Adiciona informações ao token JWT.
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Adiciona o papel (role) ao token.
      }
      return token;
    },
    // Adiciona informações à sessão do usuário.
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; // Adiciona o papel (role) à sessão.
      }
      return session;
    },
  },
};

// Cria o handler para as rotas de autenticação.
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };