import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'userId não fornecido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createServerClient({ cookies });

  const { data: userProfile, error } = await supabase
    .from('profiles')
    .select('id, email, role') // Ajuste os campos conforme sua tabela
    .eq('id', userId)
    .single();

  if (error || !userProfile) {
    return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(userProfile), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
