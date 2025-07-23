// src/app/pages/api/items/[id]/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../../utils/supabase/server'; // Cinco pontos e barras
import prisma from '../../../../../lib/prisma'; // Cinco pontos e barras

// ... o restante do seu código neste arquivo// ... o restante do seu código neste arquivo// Tipagem para os parâmetros da URL
interface Context {
  params: {
    id: string; // O ID do usuário na URL
  };
}

export async function GET(request: Request, context: Context) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = context.params;

  try {
    // Exemplo de uso do Prisma para buscar um usuário pelo ID
    const foundUser = await prisma.user.findUnique({
      where: {
        id: id, // O ID do usuário vindo da URL
      },
      // select: { ... } // Especifique os campos se não quiser retornar tudo
    });

    if (!foundUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(foundUser, { status: 200 });

  } catch (error: any) {
    console.error(`Erro ao buscar usuário ${id}:`, error.message);
    return NextResponse.json({ error: 'Falha ao buscar usuário: ' + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Context) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = context.params;
  const { email, role } = await request.json(); // Exemplo de dados para atualização

  try {
    // Exemplo de uso do Prisma para atualizar um usuário pelo ID
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        role,
        // Outros campos a serem atualizados
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error: any) {
    console.error(`Erro ao atualizar usuário ${id}:`, error.message);
    return NextResponse.json({ error: 'Falha ao atualizar usuário: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = context.params;

  try {
    // Exemplo de uso do Prisma para deletar um usuário pelo ID
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Usuário deletado com sucesso' }, { status: 204 }); // 204 No Content

  } catch (error: any) {
    console.error(`Erro ao deletar usuário ${id}:`, error.message);
    return NextResponse.json({ error: 'Falha ao deletar usuário: ' + error.message }, { status: 500 });
  }
}