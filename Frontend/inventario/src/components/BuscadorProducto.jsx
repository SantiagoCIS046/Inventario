import React, { useEffect, useRef, useState } from 'react';
import { Search, Barcode } from 'lucide-react';

const BuscadorProducto = ({ onBuscar }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  // Foco inicial al cargar el componente
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onBuscar(query);
      setQuery('');
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          id="buscador-pos"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escanee o busque producto..."
          className="w-full bg-white border-2 border-gray-50 py-3.5 pl-12 pr-16 rounded-2xl text-base font-bold text-gray-700 shadow-sm focus:ring-8 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all placeholder:text-gray-300"
        />
      </form>
      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
        <Barcode size={20} className="text-gray-200" />
      </div>
    </div>
  );
};

export default BuscadorProducto;
