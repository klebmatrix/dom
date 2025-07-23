'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Sistema</h1>
      <button
        className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => router.push('/login')}
      >
        Login
      </button>
    </main>
  )
}
