// app/api/invite-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Importa o cliente Supabase para o servidor (para obter a sessão) e o cliente admin
import { createServerSupabaseClient, supabaseAdmin } from '../../../utils/supabase/server';
import prisma from '../../../lib/prisma'; // Importa a instância do Prisma Client

export async function POST(req: NextRequest) {
  const { email, password, role } = await req.json();

  if (!email || !password || !role) {
    return NextResponse.json({ error: 'E-mail, senha e papel são obrigatórios.' }, { status: 400 });
  }

  try {
    // 1. Obtenha a sessão do usuário que fez a requisição usando o cliente do servidor
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('Erro ao obter sessão ou usuário chamador na API /api/invite-user:', sessionError?.message || 'Sessão ou usuário não encontrados.');
      return NextResponse.json({ error: 'Não autorizado. Sessão de autenticação inválida ou ausente.' }, { status: 401 });
    }

    const callerUser = session.user; // Agora callerUser é garantido se não houver erro

    // 2. Verifique o papel do usuário que está chamando esta API Route usando Prisma
    const callerProfile = await prisma.userProfile.findUnique({
      where: { userId: callerUser.id },
    });

    if (!callerProfile) {
      console.error('Erro ao obter perfil do usuário chamador: Perfil não encontrado.');
      return NextResponse.json({ error: 'Não autorizado. Perfil do usuário chamador não encontrado.' }, { status: 401 });
    }

    const callerRole = callerProfile.role;

    // 3. Implemente a lógica de permissão para convidar usuários
    if (callerRole === 'master') {
      // MASTER pode criar qualquer papel
    } else if (callerRole === 'admin') {
      // ADMIN pode criar 'gerente', 'operador', 'usuarioA', 'usuarioB', 'usuarioC', 'usariod'.
      // Eles NÃO podem criar 'master' ou 'admin'.
      const allowedRolesForAdmin = ['gerente', 'operador', 'usuarioA', 'usuarioB', 'usuarioC', 'usariod'];
      if (!allowedRolesForAdmin.includes(role)) {
        return NextResponse.json(
          { error: `Administradores só podem criar usuários com os papéis: ${allowedRolesForAdmin.join(', ')}.` },
          { status: 403 }
        );
      }
    } else {
      // Outros papéis (gerente, usuario) não têm permissão para convidar novos usuários.
      return NextResponse.json({ error: 'Você não tem permissão para convidar novos usuários.' }, { status: 403 });
    }

    // 4. Crie o novo usuário em auth.users (usando supabaseAdmin)
    const { data: newUserAuth, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Opcional: confirma o email automaticamente
    });

    if (createUserError || !newUserAuth.user) {
      console.error('Erro ao criar usuário no Supabase Auth:', createUserError?.message);
      return NextResponse.json({ error: createUserError?.message || 'Erro ao criar usuário.' }, { status: 400 });
    }

    const newUserId = newUserAuth.user.id;

    // 5. Crie o perfil do usuário na tabela user_profiles (usando Prisma)
    const newUserProfile = await prisma.userProfile.create({
      data: {
        userId: newUserId,
        email: email,
        role: role,
      },
    });

    // NOVO: Se o papel for 'usariod', crie um agente padrão para ele
    if (role === 'usariod') {
      await prisma.agent.create({
        data: {
          name: "Agente de Instruções Padrão", // Nome padrão para o agente
          userId: newUserId,
        },
      });
      console.log(`Agente padrão criado para o novo usuário usariod: ${email}`);
    }

    return NextResponse.json({ message: 'Usuário convidado com sucesso!', userId: newUserId, userProfile: newUserProfile }, { status: 200 });

  } catch (err: any) {
    console.error('Erro na API Route /api/invite-user:', err.message);
    return NextResponse.json({ error: err.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}
