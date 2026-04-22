import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('search_history') || '[]');
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const saveToHistory = (term) => {
    const newTerm = term.trim();
    if (!newTerm) return;
    
    // Agregamos al inicio y quitamos duplicados
    let newHistory = [newTerm, ...history.filter(h => h.toLowerCase() !== newTerm.toLowerCase())];
    
    // Limitar a los últimos 5
    if (newHistory.length > 5) {
       newHistory = newHistory.slice(0, 5);
    }
    
    setHistory(newHistory);
    localStorage.setItem('search_history', JSON.stringify(newHistory));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveToHistory(query);
    setShowHistory(false);
    onSearch(query);
  };

  const handleHistoryClick = (term) => {
    setQuery(term);
    saveToHistory(term);
    setShowHistory(false);
    onSearch(term);
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 relative z-50">
      <div className={`relative flex items-center shadow-lg bg-white ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden transition-all ${showHistory && history.length > 0 ? 'rounded-t-2xl' : 'rounded-full'}`}>
        <div className="pl-6 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          placeholder="Buscar un cuento de Edgar Allan Poe..."
          className="w-full px-4 py-4 text-lg text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="mr-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Menú de Historial */}
      {showHistory && history.length > 0 && (
        <ul className="absolute left-0 right-0 top-full bg-white border border-t-0 border-gray-200 rounded-b-2xl shadow-xl overflow-hidden py-2 animate-fade-in text-left">
          <li className="px-5 text-xs tracking-wider text-gray-400 uppercase font-semibold mb-1">
            Búsquedas recientes
          </li>
          {history.map((term, idx) => (
            <li 
              key={idx}
              onClick={() => handleHistoryClick(term)}
              className="px-5 py-3 hover:bg-blue-50 flex items-center cursor-pointer transition-colors text-gray-700 font-medium group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {term}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}