const API_URL = 'http://127.0.0.1:8000/api';

export const searchDocuments = async (query) => {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Hubo un error contactando al servidor.');
  }
  return await response.json();
};