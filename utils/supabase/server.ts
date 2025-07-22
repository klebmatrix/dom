    // utils/supabase/server.ts
    import { createServerClient, type CookieOptions } from '@supabase/ssr';
    import { cookies } from 'next/headers';
    import { createClient } from '@supabase/supabase-js'; // Importa createClient para o cliente admin

    // Função para criar o cliente Supabase para Server Components/API Routes
    export function createServerSupabaseClient() {
      const cookieStore = cookies();

      return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            async get(name: string) { // <-- ADICIONADO ASYNC AQUI
              return (await cookieStore.get(name))?.value; // <-- ADICIONADO AWAIT AQUI
            },
            set(name: string, value: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value, ...options });
              } catch (error) {
                console.error('Erro ao definir cookie no servidor:', error);
              }
            },
            remove(name: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value: '', ...options });
              } catch (error) {
                console.error('Erro ao remover cookie no servidor:', error);
              }
            },
          },
        }
      );
    }

    // Inicializa o cliente Supabase com a Service Role Key (para operações de administrador)
    // Esta chave DEVE ser mantida em segredo e usada APENAS no lado do servidor.
    // Certifique-se de que SUPABASE_SERVICE_ROLE_KEY está no seu arquivo .env.local
    export const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    