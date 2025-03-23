import Link from "next/link";
import prisma from "@/app/lib/prisma";

export default async function BagPage({ params }: { params: { id: string } }) {
  // Verifica se o ID é válido.
  if (!params.id || isNaN(parseInt(params.id))) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">ID inválido!</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  // Busca a bolsa no banco de dados pelo ID.
  const bag = await prisma.bag.findUnique({
    where: {
      id: parseInt(params.id), // Converte o ID para número.
    },
  });

  // Se a bolsa não for encontrada, exibe uma mensagem de erro.
  if (!bag) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bolsa não encontrada!</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Botão de voltar */}
        <div className="text-left mb-4">
          <Link href="/" className="text-black-600 hover:underline">
            &larr; Voltar para início
          </Link>
        </div>

        {/* Container da imagem */}
        <div className="flex justify-center">
          <img
            src={bag.image}
            alt={bag.name}
            className="w-full max-w-md h-auto object-cover rounded-lg"
          />
        </div>

        {/* Detalhes da bolsa */}
        <h1 className="text-3xl font-bold mt-6">{bag.name}</h1>
        <p className="text-gray-600 mt-2">${bag.price}</p>
        <p className="mt-4 text-gray-700">{bag.description}</p>
      </div>
    </div>
  );
}