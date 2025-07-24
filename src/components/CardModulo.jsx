// src/components/CardModulo.jsx

export default function CardModulo({ titulo, descricao }) {
  return (
    <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {titulo}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        {descricao}
      </p>
    </div>
  );
}
