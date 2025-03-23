// src/app/admin/page.tsx
"use client";

import ClientLayout from "../ClientLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "admin")) {
      router.push("/api/auth/signin");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <ClientLayout>
      <div className="flex justify-center items-center min-h-screen p-8 bg-gray-100">
        <div className="max-w-2xl w-full bg-white p-10 rounded-lg shadow-xl border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Admin Dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition">Gerenciar Bolsas</button>
            <button className="bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition">Ver Pedidos</button>
            <button className="bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition">Usuários</button>
            <button className="bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition">Configurações</button>
            <button onClick={() => router.push("/add-bag")} className="col-span-2 bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition">Postar Bolsa</button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
