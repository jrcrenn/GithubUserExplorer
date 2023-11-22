import React from 'react';

interface UserCardProps {
  user: any;
  customClassName?: string;
  isSelected?: boolean;
  onCheckboxChange?: () => void;
  isEditMode?: boolean;
  debugEditMode?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  customClassName = '',
  isSelected = false,
  onCheckboxChange,
  isEditMode = false,
  debugEditMode = false,
}) => {
  const selectedStyle = isSelected
    ? 'ring-2 ring-github_orange border-github_orange transition-all'
    : '';

  return (
    <section
      className={`relative shadow-lg flex flex-col justify-center items-center content-center my-3 py-3 w-100 border border-gray-600 rounded-md ${selectedStyle} ${customClassName}`}
    >
      {(isEditMode || debugEditMode) && (
        <input
          type="checkbox"
          className="absolute left-5 top-5 w-3 h-3 accent-github_orange"
          checked={isSelected}
          onChange={onCheckboxChange}
        />
      )}
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full bg-gray-500 object-cover"
      />
      <div className="flex flex-col justify-center mt-5 w-full px-10 text-center">
        <span className="block text-gray-700 text-md italic">{user.id}</span>
        <span className="block text-gray-600 text-lg mb-4 truncate font-bold">{user.login}</span>
        <a
          href={user.html_url}
          className="bg-github_dark_gray border hover:border-github_orange hover:text-github_orange transition-all font-bold rounded px-4 py-2 w-full text-center"
        >
          Consulter le profil
        </a>
      </div>
    </section>
  );
};

export default UserCard;
