'use client';
import Link from 'next/link';

export default function MasterDashboard() {
  const funcionalidades = [
    { nome: 'Gerenciar Usuários', rota: '/master/usuarios' },
    { nome: 'Ferramentas de Rede', rota: '/master/rede' },
    { nome: 'Ferramentas de Sistema', rota: '/master/sistema' },
    { nome: 'Gráficos e Relatórios', rota: '/master/graficos' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Painel Master</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {funcionalidades.map((item, index) => (
          <Link href={item.rota} key={index}>
            <div className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-100 cursor-pointer transition-all text-center">
              <h2 className="text-xl font-semibold">{item.nome}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
