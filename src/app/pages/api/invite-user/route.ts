// src/app/pages/api/invite-user/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'; // QUATRO ../
import prisma from '../../../../lib/prisma'; // QUATRO ../
export async function POST(request: Request) {
  const supabase = createClient();
  const { email, role } = await request.json();

  try {
    // Exemplo de uso do Supabase para convidar usuário (ajuste conforme sua lógica de auth)
    // Se você usa o convite do Supabase auth, a lógica é diferente.
    // Este é um exemplo de registro e depois atualização no DB.
    const { data: user, error: authError } = await supabase.auth.admin.inviteUserByEmail(email);

    if (authError) {
      console.error('Erro ao convidar usuário pelo Supabase:', authError.message);
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Exemplo de uso do Prisma para salvar informações do convite/usuário no seu DB
    const newUser = await prisma.user.create({
      data: {
        email: email,
        role: role,
        supabaseId: user?.user?.id, // Associa ao ID do Supabase
        // Outros campos necessários
      },
    });

    return NextResponse.json({ message: 'Convite enviado e usuário criado!', user: newUser }, { status: 200 });

  } catch (error: any) {
    console.error('Erro na API de convite de usuário:', error.message);
    return NextResponse.json({ error: 'Falha ao convidar usuário: ' + error.message }, { status: 500 });
  }
}

// Se você precisar de outras operações (GET, PUT, DELETE), adicione aqui
// export async function GET(request: Request) { ... }