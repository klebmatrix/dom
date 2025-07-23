// src/app/pages/api/users/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'; // QUATRO ../
import prisma from '../../../../lib/prisma'; // QUATRO ../

// ... o restante do seu código GET e POST para usuários (conforme o exemplo que te dei)
export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      // select: { id: true, email: true, role: true } // Selecione os campos que deseja retornar
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar usuários:', error.message);
    return NextResponse.json({ error: 'Falha ao buscar usuários: ' + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { email, role } = await request.json(); // Exemplo de dados para criar um novo usuário

  try {
    // Primeiro, verifique se o email já existe para evitar duplicação no Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Usuário com este email já existe.' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        role,
        // Adicione outros campos conforme seu schema.prisma
        supabaseId: user.id // Se você quer associar o criador
      },
    });
    return NextResponse.json(newUser, { status: 201 });

  } catch (error: any) {
    console.error('Erro ao criar usuário:', error.message);
    return NextResponse.json({ error: 'Falha ao criar usuário: ' + error.message }, { status: 500 });
  }
}