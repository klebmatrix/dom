'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import CardModulo from '@/components/CardModulo'

export default function PainelPage() {
  const router = useRouter()

  const sair = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-6">Painel do Master</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        <CardModulo titulo="Gerenciador de Usuário" />
        <CardModulo titulo="Ferramenta Gerenciadora de Rede" />
        <CardModulo titulo="Ferramenta Gerenciadora de Sistema" />
        <CardModulo titulo="Gerenciador de Gráficos" />
      </div>
      <button onClick={sair} className="mt-10 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Sair</button>
    </div>
  )
}


