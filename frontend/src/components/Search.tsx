import React, { useState, useEffect } from 'react';
import { searchUsers } from '../api/githubApi.ts';
import EditControls from './EditControls';
import UserList from './UserList';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    const clearResults = () => {
      setResults([]);
    };

    const handleApiError = (error: any) => {
      if (error.response && error.response.status === 403) {
        setError('Limite de l\'API GitHub dépassée. Veuillez patienter et réessayer plus tard.');
      } else {
        setError('Erreur de l\'API GitHub. Veuillez réessayer plus tard.');
        console.error('Erreur de l\'API GitHub :', error);
      }
      clearResults();
    };

    const search = async () => {
      if (query.trim() === '') {
        clearResults();
        return;
      }

      try {
        const users = await searchUsers(query);
        setResults(users);
        setError(null);
      } catch (error) {
        handleApiError(error);
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
    setSelectAllChecked(false);
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
          className="w-full lg:w-1/3 bg-gray-300 border border-gray-300 hover:bg-gray-400 hover:border-gray-400 mx-auto py-3 rounded-lg shadow-md shadow-gray-500 hover:scale-[1.02] transition-transform font-bold"
        >
          {isEditMode ? 'Terminer' : 'Modifier'}
        </button>
      </div>
      {query.trim() !== "" && (
        isEditMode && selectedItems.length > 0 ? (
          <EditControls
            selectAllChecked={selectAllChecked}
            handleSelectAllChange={handleSelectAllChange}
            selectedItems={selectedItems}
            handleDuplicateClick={handleDuplicateClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : null
      )}

      {error && <p className="text-red-500">{error}</p>}
      <UserList
        hasSearched={hasSearched}
        results={results}
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Search;