'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { useEffect } from 'react'

export default function MasterPanel() {
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

  const cards = [
    { titulo: 'Gerenciar Usuários', rota: '/master/usuarios' },
    { titulo: 'Ger. Ferr. Rede', rota: '/master/rede' },
    { titulo: 'Ger. Ferr. Sistema', rota: '/master/sistema' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-6 relative">
      {/* Botão Sair */}
      <button onClick={handleLogout}>Sair</button>

      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
        Painel Master
      </h1>

      <div className="flex flex-wrap justify-center gap-12">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.rota}
            className="w-64 h-64 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 rounded-full flex items-center justify-center text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white/10"
          >
            <span className="text-xl font-medium tracking-wide px-4">
              {card.titulo}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
