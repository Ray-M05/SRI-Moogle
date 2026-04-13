import { useState } from 'react';
import { searchDocuments } from '../services/api';

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = async (query) => {
    // Evitar búsquedas vacías
    if (!query.trim()) {
      setResults([]);
      setSuggestions({});
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await searchDocuments(query);
      setResults(data.results || []);
      setSuggestions(data.suggestions || {});
    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error al buscar. Verifica que el backend esté encendido.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { results, suggestions, isLoading, error, performSearch };
};