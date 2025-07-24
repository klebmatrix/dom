// src/app/layout.tsx
import './globals.css'; // Importa os estilos globais, incluindo Tailwind CSS
import React from 'react';

export const metadata = {
  title: 'DOM',
  description: 'Sistema de Gerenciamento.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* O body agora atua como um container flexível que ocupa a tela toda. */}
      {/* Removemos 'items-center justify-center' e 'max-w' aqui. */}
      {/* Adicionado 'overflow-x-hidden' para evitar barras de rolagem horizontais indesejadas. */}
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-gray-100 font-sans">

        {/* O cabeçalho ocupa 100% da largura, com conteúdo centralizado e padding */}
        <header className="w-full text-center py-8 px-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            DOM
          </h1>
        </header>

        {/* O <main> agora se expande para ocupar o máximo de espaço, sem limite de largura (max-w) imposto aqui. */}
        {/* O conteúdo dentro do 'children' (seu PainelMaster) poderá definir seu próprio max-w ou centralização. */}
        <main className="flex-grow w-full px-4 py-8">
          {children}
        </main>

        {/* O rodapé ocupa 100% da largura, com texto centralizado e padding */}
        <footer className="w-full text-center py-6 px-4 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Projeto Dom. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}