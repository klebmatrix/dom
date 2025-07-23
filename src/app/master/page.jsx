'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function MasterPanel() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const cards = [
    { titulo: 'Gerenciar Usuários', rota: '/master/usuarios' },
    { titulo: 'Ger. Ferr. Rede', rota: '/master/rede' },
    { titulo: 'Ger. Ferr. Sistema', rota: '/master/sistema' },
    { titulo: 'Ger. Gráficos', rota: '/master/graficos' }
  ]

  if (loading) return <div className="text-white text-center mt-10">Carregando...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-6 relative">
      {/* Botão Sair */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Sair
      </button>

      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
        Painel Master
      </h1>

      <div className="flex flex-wrap justify-center gap-12">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.rota}
            className="w-56 h-56 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 rounded-full flex items-center justify-center text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white/10"
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
