// src/app/pages/api/items/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'; // QUATRO ../
import prisma from '../../../../lib/prisma'; // QUATRO ../export async function GET(request: Request) {
  const supabase = createClient();
  // Você pode usar o Supabase para verificar a sessão do usuário ou outras coisas de autenticação/autorização aqui
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // Exemplo de uso do Prisma para buscar todos os itens
    const items = await prisma.item.findMany(); // Supondo que você tenha um modelo 'Item' no seu schema.prisma
    return NextResponse.json(items, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao buscar itens:', error.message);
    return NextResponse.json({ error: 'Falha ao buscar itens: ' + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { name, description, price } = await request.json(); // Exemplo de dados para um novo item

  try {
    // Exemplo de uso do Prisma para criar um novo item
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        price: parseFloat(price), // Certifique-se de que o tipo corresponde ao seu schema
        createdBy: user.id, // Associa o item ao usuário logado
      },
    });
    return NextResponse.json(newItem, { status: 201 });

  } catch (error: any) {
    console.error('Erro ao criar item:', error.message);
    return NextResponse.json({ error: 'Falha ao criar item: ' + error.message }, { status: 500 });
  }
}