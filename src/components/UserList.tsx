import React from 'react';
import UserCard from './UserCard';

const UserList: React.FC<{
  hasSearched: boolean;
  results: any[];
  selectedItems: number[];
  handleCheckboxChange: (index: number) => void;
  isEditMode: boolean;
}> = ({
  hasSearched,
  results,
  selectedItems,
  handleCheckboxChange,
  isEditMode,
}) => {
  const noResultsMessage =
    hasSearched && results.length === 0 && !Error ? (
      <p className="text-gray-600">Aucun résultat trouvé.</p>
    ) : null;

  return (
    <div className="mt-10 mx-12 overflow-y-auto max-h-[500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
      {noResultsMessage}
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
  );
};

export default UserList;
