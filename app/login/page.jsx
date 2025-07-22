// src/app/login/page.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../utils/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrar, setLembrar] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const userSalvo = localStorage.getItem('usuario_salvo')
    if (userSalvo) {
      setEmail(userSalvo)
      setLembrar(true)
    }
  }, [])

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setErro('Credenciais inválidas')
    } else {
      if (lembrar) {
        localStorage.setItem('usuario_salvo', email)
      } else {
        localStorage.removeItem('usuario_salvo')
      }

      const { user } = data
      if (user) {
        // Redireciona para painel Master
        router.push('/master')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-black p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl shadow-xl p-10 w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-3 rounded bg-white bg-opacity-20 mb-4 placeholder-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded bg-white bg-opacity-20 mb-4 placeholder-white outline-none"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <label className="flex items-center text-sm mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={lembrar}
            onChange={(e) => setLembrar(e.target.checked)}
          />
          Lembrar de mim
        </label>

        {erro && <p className="text-red-400 text-sm mb-2">{erro}</p>}

        <button
          className="w-full bg-purple-700 hover:bg-purple-800 transition rounded p-3 font-bold"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
