'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      alert('Credenciais inválidas')
    } else {
      // Pega o usuário
      const { user } = data
      // Redireciona para painel
      router.push('/painel')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded text-black"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded" type="submit">Entrar</button>
      </form>
    </div>
  )
}
