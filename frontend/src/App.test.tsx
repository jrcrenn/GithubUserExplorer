import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../src/components/UserCard'; // Mettez à jour l'import ici

// Mocked data
const userItem = {
  id: 27289536,
  login: 'jrcrenn',
  html_url: 'https://github.com/jrcrenn',
  avatar_url: 'https://avatars.githubusercontent.com/u/27289536?v=4',
};

const mockHandleCheckboxChange = jest.fn();

describe('UserCard Component Tests', () => {
  it('should display the information of the user', () => {
    render(
      <UserCard user={userItem} isSelected={false} isEditMode={false} />
    );

    // Check if user information is displayed correctly
    expect(screen.getByText(userItem.login)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Consulter le profil' })).toHaveAttribute('href', userItem.html_url);
    expect(screen.getByAltText(userItem.login)).toHaveAttribute('src', userItem.avatar_url);
  });

  it('should not show the checkbox when edit mode is off', () => {
    render(
      <UserCard user={userItem} isSelected={false} isEditMode={false} />
    );

    // Check that the checkbox is not present
    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).toBeNull();
  });

  it('should show the checkbox when edit mode is on', () => {
    render(
      <UserCard user={userItem} isSelected={false} isEditMode={true} />
    );

    // Check that the checkbox is present
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should call the checkbox change handler when the checkbox is clicked', () => {
    render(
      <UserCard user={userItem} isSelected={false} isEditMode={true} onCheckboxChange={mockHandleCheckboxChange} />
    );

    // Simulate a click on the checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check if the checkbox change handler is called
    expect(mockHandleCheckboxChange).toHaveBeenCalledTimes(1);
  });
});
