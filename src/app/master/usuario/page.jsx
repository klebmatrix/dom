'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export default function MasterPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Verifica o papel no Supabase
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (data?.role !== 'master') {
        router.push('/unauthorized')
      } else {
        setUser(user)
      }
    }

    getUser()
  }, [router])

  const cards = [
    { title: 'Gerenciar Usuários', description: 'Adicione ou remova usuários', href: '/master/usuarios' },
    { title: 'Ferramentas de Rede', description: 'Monitoramento e ajustes de rede', href: '/master/rede' },
    { title: 'Ferramentas do Sistema', description: 'Ajustes e diagnósticos do sistema', href: '/master/sistema' },
    { title: 'Gerenciar Gráficos', description: 'Visualize métricas do sistema', href: '/master/graficos' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Painel do Master</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg hover:bg-gray-700 transition"
              onClick={() => router.push(card.href)}
              role="button"
            >
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
