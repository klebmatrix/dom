
'use client'
import { useState } from 'react'
import { useRouter } from '../../next/navigation'
import { supabase } from '../../utils/supabaseClient'

const cards = [
  { title: 'Gerenciador de Usuários' },
  { title: 'Ferramenta Gerenciadora de Rede' },
  { title: 'Ferramenta Gerenciadora de Sistema' },
  { title: 'Gerenciador de Gráficos' }
]

export default function PainelMaster() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {/* Botão de Sair */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Sair
      </button>

      <h1 className="text-3xl font-bold mb-8">Painel do Master</h1>
      <div className="flex flex-wrap justify-center gap-8 mt-4"> {/* Ajuste para flexbox e gap */}
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-40 h-40 bg-white rounded-full shadow-lg flex flex-col items-center justify-center text-center p-4 hover:bg-blue-100 transition"
          >
            <span className="text-sm font-medium">{card.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}