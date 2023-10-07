import React, { useState, useEffect } from 'react';
import { searchUsers } from '../api/githubApi.ts';
import UserCard from './UserCard';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      try {
        const users = await searchUsers(query);
        setResults(users);
        setError(null);
      } catch (error : any) {
        if (error.response && error.response.status === 403) {
          setError(
            'Limite de l\'API GitHub dépassée. Veuillez patienter et réessayer plus tard.'
          );
        } else {
          setError('Erreur de l\'API GitHub. Veuillez réessayer plus tard.');
          console.error('Erreur de l\'API GitHub :', error);
        }
        setResults([]);
      } finally {
        setHasSearched(true);
      }
    };

    setSelectedItems([]);
    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleCheckboxChange = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDuplicateClick = () => {
    const duplicatedResults = [...results];
    selectedItems.forEach((index) => {
      duplicatedResults.push(results[index]);
    });
    setResults(duplicatedResults);
    setSelectedItems([]);
  };

  const handleDeleteClick = () => {
    const updatedResults = results.filter((_, index) => !selectedItems.includes(index));
    setResults(updatedResults);
    setSelectedItems([]);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectAllChecked(false); // Réinitialiser la case à cocher "Sélectionner tout"
  };

  const handleSelectAllChange = () => {
    if (selectAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(results.map((_, index) => index));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  return (
    <div className='flex-grow flex flex-col justify-around items-center w-full'>
      <div className='flex flex-col w-full md:w-2/3 gap-4 h-full justify-center px-5'>
        <input
          type="text"
          placeholder="Rechercher des utilisateurs GitHub"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full lg:w-1/2 mx-auto p-3 rounded-lg border border-gray-300"
        />
        <button
          onClick={toggleEditMode}
          className="w-full lg:w-1/3 bg-gray-300 border border-gray-300 hover:bg-gray-400 hover:border-gray-400 mx-auto py-3 rounded-lg shadow-md shadow-gray-500 hover:scale-[1.02] transition-transform"
        >
          Modifier
        </button>
      </div>
      {query.trim() !== "" && (
        isEditMode && selectedItems.length > 0 ? (
          <div className='flex justify-between w-full h-10 my-8 lg:mb-10 px-10'>
            <div className='mx-5'>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
                className='w-4 h-4 text-gray-600'
              />
              <span className='ml-3 text-lg text-gray-600'>
                {selectedItems.length === 0
                  ? "Aucun élément sélectionné"
                  : selectedItems.length === 1
                  ? "1 élément sélectionné"
                  : `${selectedItems.length} éléments sélectionnés`}
              </span>
            </div>
            <div className='mx-5 flex gap-5'>
              <button
                onClick={handleDuplicateClick}
                className="bg-gray-400 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-500 hover:text-white"
              >
                Dupliquer
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-gray-400 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-500 hover:text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        ) : null
      )}

      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-10 mx-12 overflow-y-auto max-h-[500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
        {hasSearched && results.length === 0 && !error && (
          <p className="text-gray-600">Aucun résultat trouvé.</p>
        )}
        {results.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            customClassName={results.length < 4 ? 'small-width' : ''}
            isSelected={selectedItems.includes(index)}
            onCheckboxChange={() => handleCheckboxChange(index)}
            isEditMode={isEditMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
