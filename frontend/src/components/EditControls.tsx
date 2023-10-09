import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faTrash } from '@fortawesome/free-solid-svg-icons';

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
}) => {
  const itemCountText =
    selectedItems.length === 0
      ? 'Aucun élément sélectionné'
      : selectedItems.length === 1
      ? '1 élément sélectionné'
      : `${selectedItems.length} éléments sélectionnés`;

  return (
    <div className='flex justify-between w-full h-10 my-8 lg:mb-10 px-10'>
      <div className='mx-5 flex items-center'>
        <input
          type="checkbox"
          checked={selectAllChecked}
          onChange={handleSelectAllChange}
          className='w-4 h-4 text-gray-600'
        />
        <span className='ml-3 text-lg text-gray-600 font-bold'>{itemCountText}</span>
      </div>
      <div className='mx-5 flex gap-5'>
        <button onClick={handleDuplicateClick}>
          <FontAwesomeIcon icon={faClone} className='text-2xl' />
        </button>
        <button onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} className='text-2xl' />
        </button>
      </div>
    </div>
  );
};

export default EditControls;
