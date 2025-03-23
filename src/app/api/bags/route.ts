import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import path from "path";

// Método POST para adicionar uma nova bolsa.
export async function POST(request: Request) {
  try {
    const formData = await request.formData(); // Processa o FormData.

    // Extrai os dados do formulário.
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    // Verifica se o arquivo de imagem foi enviado.
    if (!imageFile) {
      throw new Error("Nenhuma imagem foi enviada.");
    }

    // Salva a imagem no sistema de arquivos.
    const imagePath = path.join(process.cwd(), "public", "uploads", imageFile.name);
    const imageUrl = `/uploads/${imageFile.name}`;

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(imagePath, buffer);

    // Adiciona a nova bolsa ao banco de dados.
    const newBag = await prisma.bag.create({
      data: {
        name,
        price,
        image: imageUrl, // Salva a URL da imagem.
        description,
      },
    });

    // Retorna uma resposta de sucesso.
    return NextResponse.json({ message: "Bolsa adicionada com sucesso!", bag: newBag }, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar a bolsa:", error);
    return NextResponse.json({ message: "Falha ao adicionar a bolsa!" }, { status: 500 });
  }
}

// Método GET para buscar todas as bolsas.
export async function GET() {
  try {
    // Busca todas as bolsas no banco de dados.
    const bags = await prisma.bag.findMany();

    // Retorna as bolsas como resposta.
    return NextResponse.json(bags, { status: 200 });
  } catch (error) {
    // Retorna uma resposta de erro em caso de falha.
    console.error("Erro ao buscar as bolsas:", error);
    return NextResponse.json({ message: "Falha ao buscar as bolsas!" }, { status: 500 });
  }
}

// Método DELETE para remover uma bolsa.
export async function DELETE(request: Request) {
  try {
    // Verifica a sessão do usuário.
    const session = await getServerSession(authOptions);

    // Se o usuário não estiver autenticado ou não for um admin, retorna um erro.
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Acesso negado!" }, { status: 403 });
    }

    const { id } = await request.json(); // Obtém o ID da bolsa a ser removida.

    // Remove a bolsa do banco de dados.
    await prisma.bag.delete({
      where: {
        id: parseInt(id), // Converte o ID para número.
      },
    });

    // Retorna uma resposta de sucesso.
    return NextResponse.json({ message: "Bolsa removida com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao remover a bolsa:", error);
    return NextResponse.json({ message: "Falha ao remover a bolsa!" }, { status: 500 });
  }
}