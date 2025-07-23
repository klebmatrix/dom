'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../utils/supabase/client'
import prisma from '@/lib/prisma';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (error) {
      setErro('Credenciais inválidas')
    } else {
      router.push('/master')
    }
  }

  return (
    <main className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Login em DOM</h1>
        {erro && <p className="text-red-500 mb-2">{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </main>
  )
}
