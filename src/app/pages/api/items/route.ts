// src/app/pages/api/items/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'; // QUATRO ../
import prisma from '../../../../lib/prisma'; // QUATRO ../

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const items = await prisma.item.findMany();
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

  const { name, description, price } = await request.json();

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        createdBy: user.id,
      },
    });
    return NextResponse.json(newItem, { status: 201 });

  } catch (error: any) {
    console.error('Erro ao criar item:', error.message);
    return NextResponse.json({ error: 'Falha ao criar item: ' + error.message }, { status: 500 });
  }
}
