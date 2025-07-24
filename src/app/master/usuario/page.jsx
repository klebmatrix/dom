'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function MasterPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
      }
    }

    checkSession()
  }, [])

  const cards = [
    { title: 'Gerenciador de Usuários', color: 'bg-blue-500' },
    { title: 'Ferr. Gerenciadora de Rede', color: 'bg-green-500' },
    { title: 'Ferr. Gerenciadora de Sys', color: 'bg-purple-500' },
    { title: 'Gerenciador de Gráficos', color: 'bg-yellow-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-10 text-center">Painel Master</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-48 h-48 ${card.color} rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer`}
          >
            <p className="text-center font-semibold px-4">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
