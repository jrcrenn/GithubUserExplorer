import React from 'react';

const EditControls: React.FC<{
  selectAllChecked: boolean;
  handleSelectAllChange: () => void;
  selectedItems: number[];
  handleDuplicateClick: () => void;
  handleDeleteClick: () => void;
}> = ({
  selectAllChecked,
  handleSelectAllChange,
  selectedItems,
  handleDuplicateClick,
  handleDeleteClick,
}) => (
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
);

export default EditControls;
