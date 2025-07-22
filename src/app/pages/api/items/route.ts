// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../utils/supabase/server'; // Cliente Supabase para o servidor
import prisma from '../../../lib/prisma';

// GET: Listar itens do usuário logado
export async function GET(req: NextRequest) {
  try {
    // 1. Obtenha a sessão do usuário
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('Erro ao obter sessão ou usuário na API GET /api/items:', sessionError?.message || 'Sessão ou usuário não encontrados.');
      return NextResponse.json({ error: 'Não autorizado. Sessão de autenticação inválida ou ausente.' }, { status: 401 });
    }

    const user = session.user; // Agora user é garantido se não houver erro

    // 2. Busque os itens do usuário usando Prisma
    const items = await prisma.item.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(items, { status: 200 });

  } catch (err: any) {
    console.error('Erro na API Route GET /api/items:', err.message);
    return NextResponse.json({ error: err.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}

// POST: Adicionar um novo item
export async function POST(req: NextRequest) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: 'O nome do item é obrigatório.' }, { status: 400 });
  }

  try {
    // 1. Obtenha a sessão do usuário
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('Erro ao obter sessão ou usuário na API POST /api/items:', sessionError?.message || 'Sessão ou usuário não encontrados.');
      return NextResponse.json({ error: 'Não autorizado. Sessão de autenticação inválida ou ausente.' }, { status: 401 });
    }

    const user = session.user; // Agora user é garantido se não houver erro

    // 2. Crie o item usando Prisma
    const newItem = await prisma.item.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return NextResponse.json(newItem, { status: 201 }); // 201 Created

  } catch (err: any) {
    console.error('Erro na API Route POST /api/items:', err.message);
    return NextResponse.json({ error: err.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}
