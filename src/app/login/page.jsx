'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../utils/supabase/client'
import { createClientComponentClient } from '../../utils/supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Credenciais inválidas')
    } else {
      router.push('/painel')
    }
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mb-2 px-4 py-2 rounded text-black"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4 px-4 py-2 rounded text-black"
      />
      <button
        onClick={handleLogin}
        className="bg-green-600 px-6 py-2 rounded hover:bg-green-800"
      >
        Entrar
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </main>
  )
}
