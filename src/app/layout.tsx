// app/layout.tsx
import './globals.css'; // Importa os estilos globais, incluindo Tailwind CSS
import React from 'react';

export const metadata = {
  title: 'DOM', // Título simplificado para "DOM"
  description: 'Sistema de Gerenciamento.', // Descrição simplificada
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* Definindo um fundo escuro global e uma fonte padrão */}
      <body className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-100 font-sans p-4">
        <header className="w-full max-w-2xl text-center mb-10 mt-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            DOM {/* Apenas "DOM" como título visual */}
          </h1>
          {/* Removido o subtítulo "Sistema de Gerenciamento Inteligente" */}
        </header>

        {/* Renderiza o conteúdo da página atual (children) */}
        <main className="flex-grow w-full max-w-4xl">
          {children}
        </main>

        {/* Rodapé opcional */}
        <footer className="w-full text-center py-6 text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} Projeto Dom. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
