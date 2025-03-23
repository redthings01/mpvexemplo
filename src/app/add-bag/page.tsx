"use client";

import ClientLayout from "../ClientLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";

export default function AddBagPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null as File | null, // Armazena o arquivo de imagem.
    description: "",
  });

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Cria um objeto FormData para enviar o arquivo.
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Adiciona o arquivo de imagem.
      }

      // Envia os dados para a API.
      const response = await fetch("/api/bags", {
        method: "POST",
        body: formDataToSend, // Usa FormData em vez de JSON.
      });

      if (response.ok) {
        alert("Bolsa adicionada com sucesso!");
        router.push("/");
      } else {
        alert("Falha ao adicionar a bolsa!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao adicionar a bolsa!");
    }
  };

  return (
    <ClientLayout>
      <div className="flex justify-center items-center min-h-screen p-8">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Nova Bolsa</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Escolha uma imagem
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setFormData({ ...formData, image: file });
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                Adicionar Bolsa
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}