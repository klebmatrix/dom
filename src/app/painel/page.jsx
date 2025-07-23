'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PainelMaster() {
  const router = useRouter()

  const botoes = [
    { titulo: 'Gerenciador de Usuário', rota: '/usuarios' },
    { titulo: 'Gerenciador de Rede', rota: '/rede' },
    { titulo: 'Gerenciador de Sistema', rota: '/sistema' },
    { titulo: 'Gerenciador de Gráficos', rota: '/graficos' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-8">Painel Master</h1>

      <div className="grid grid-cols-2 gap-8">
        {botoes.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => router.push(btn.rota)}
            className="w-40 h-40 rounded-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center text-center p-4 shadow-lg"
          >
            <span>{btn.titulo}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => router.push('/')}
        className="mt-10 bg-red-600 px-6 py-2 rounded hover:bg-red-700"
      >
        Voltar ao Início
      </button>
    </div>
  )
}
