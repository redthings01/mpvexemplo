"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Bag = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function BagList() {
  const [bags, setBags] = useState<Bag[]>([]);
  const { data: session, status } = useSession(); // Obtém a sessão do usuário.

  // Função para buscar as bolsas.
  const fetchBags = async () => {
    try {
      const response = await fetch("/api/bags");
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setBags(data);
    } catch (error) {
      console.error("Erro ao buscar as bolsas:", error);
    }
  };

  // Função para remover uma bolsa.
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/bags", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Envia o ID da bolsa a ser removida.
      });

      if (response.ok) {
        alert("Bolsa removida com sucesso!");
        fetchBags(); // Atualiza a lista de bolsas após a remoção.
      } else {
        alert("Falha ao remover a bolsa!");
      }
    } catch (error) {
      console.error("Erro ao remover a bolsa:", error);
    }
  };

  // Busca as bolsas ao carregar o componente.
  useEffect(() => {
    fetchBags();
  }, []);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {bags.map((bag) => (
            <div key={bag.id} className="relative">
              <Link href={`/bags/${bag.id}`}>
                <img 
                  src={bag.image}
                  alt={bag.name}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{bag.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">R${bag.price}</p>
              </Link>
              {/* Botão de remoção (apenas para admin) */}
              {session?.user.role === "admin" && (
                <button
                  onClick={() => handleDelete(bag.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}