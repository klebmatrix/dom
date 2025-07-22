// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, supabaseAdmin } from '../../../../utils/supabase/server'; // Cliente Supabase para o servidor
import prisma from '../../../../lib/prisma';

// PUT: Atualizar papel de usuário
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // O ID aqui é o ID do perfil, não o user_id do auth.users
  const { role: newRole } = await req.json();

  if (!newRole) {
    return NextResponse.json({ error: 'O novo papel é obrigatório.' }, { status: 400 });
  }

  try {
    // 1. Obtenha a sessão do usuário que fez a requisição
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('Erro ao obter sessão ou usuário na API PUT /api/users/[id]:', sessionError?.message || 'Sessão ou usuário não encontrados.');
      return NextResponse.json({ error: 'Não autorizado. Sessão de autenticação inválida ou ausente.' }, { status: 401 });
    }

    const callerUser = session.user; // Agora callerUser é garantido se não houver erro

    // 2. Verifique o papel do usuário que está chamando esta API Route
    const callerProfile = await prisma.userProfile.findUnique({
      where: { userId: callerUser.id },
    });

    if (!callerProfile) {
      console.error('Erro ao obter perfil do usuário chamador: Perfil não encontrado.');
      return NextResponse.json({ error: 'Não autorizado. Perfil do usuário chamador não encontrado.' }, { status: 401 });
    }

    const callerRole = callerProfile.role;

    // 3. Implemente a lógica de permissão para atualizar papéis
    if (callerRole !== 'master') { // Apenas master pode atualizar papéis
      return NextResponse.json({ error: 'Você não tem permissão para atualizar papéis de usuários.' }, { status: 403 });
    }

    // 4. Atualize o papel do usuário usando Prisma
    const updatedUser = await prisma.userProfile.update({
      where: { id: id },
      data: { role: newRole },
    });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (err: any) {
    console.error('Erro na API Route PUT /api/users/[id]:', err.message);
    return NextResponse.json({ error: err.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}

// NOVO MÉTODO PATCH: Ativar/Desativar Usuário
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id: userAuthId } = params; // O ID aqui é o user_id do auth.users
  const { isActive } = await req.json(); // Espera um booleano (true para ativar, false para desativar)

  if (typeof isActive !== 'boolean') {
    return NextResponse.json({ error: 'O status de ativação/desativação é obrigatório e deve ser um booleano.' }, { status: 400 });
  }

  try {
    // 1. Obtenha a sessão do usuário que fez a requisição
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('Erro ao obter sessão ou usuário na API PATCH /api/users/[id]:', sessionError?.message || 'Sessão ou usuário não encontrados.');
      return NextResponse.json({ error: 'Não autorizado. Sessão de autenticação inválida ou ausente.' }, { status: 401 });
    }

    const callerUser = session.user;

    // 2. Verifique o papel do usuário que está chamando esta API Route
    const callerProfile = await prisma.userProfile.findUnique({
      where: { userId: callerUser.id },
    });

    if (!callerProfile) {
      console.error('Erro ao obter perfil do usuário chamador: Perfil não encontrado.');
      return NextResponse.json({ error: 'Não autorizado. Perfil do usuário chamador não encontrado.' }, { status: 401 });
    }

    const callerRole = callerProfile.role;

    // 3. Implemente a lógica de permissão para ativar/desativar usuários
    // Apenas 'master' pode ativar/desativar usuários
    if (callerRole !== 'master') {
      return NextResponse.json({ error: 'Você não tem permissão para ativar/desativar usuários.' }, { status: 403 });
    }

    // 4. Não permitir que o master desative a si mesmo
    if (userAuthId === callerUser.id) {
      return NextResponse.json({ error: 'Você não pode ativar/desativar a si mesmo.' }, { status: 403 });
    }

    // 5. Atualize o status do usuário em auth.users (Supabase Auth Admin)
    const { data: updatedAuthUser, error: updateAuthError } = await supabaseAdmin.auth.admin.updateUser(
      userAuthId,
      {
        ban_and_unban: isActive ? false : true, // true para banir (desativar), false para desbanir (ativar)
      }
    );

    if (updateAuthError) {
      console.error('Erro ao atualizar status do usuário no Supabase Auth:', updateAuthError.message);
      return NextResponse.json({ error: updateAuthError.message || 'Erro ao atualizar status do usuário.' }, { status: 500 });
    }

    // Opcional: Buscar o perfil atualizado para retornar um objeto completo
    const updatedUserProfile = await prisma.userProfile.findUnique({
        where: { userId: userAuthId },
    });


    return NextResponse.json({
        message: 'Status do usuário atualizado com sucesso!',
        email: updatedUserProfile?.email || updatedAuthUser.user?.email, // Retorna o email para feedback
        isActive: isActive, // Retorna o status que foi aplicado
    }, { status: 200 });

  } catch (err: any) {
    console.error('Erro na API Route PATCH /api/users/[id]:', err.message);
    return NextResponse.json({ error: err.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}
