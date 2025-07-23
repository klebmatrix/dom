export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // Verifica se userId está vindo corretamente
    console.log('API /api/users - Recebido userId:', userId);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'ID do usuário não fornecido' }), { status: 400 });
    }

    // Buscar dados do Supabase
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erro do Supabase:', error.message);
      return new Response(JSON.stringify({ error: 'Erro ao buscar usuário no banco de dados' }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return new Response(JSON.stringify({ error: 'Erro interno ao buscar perfil do usuário.' }), { status: 500 });
  }
}
