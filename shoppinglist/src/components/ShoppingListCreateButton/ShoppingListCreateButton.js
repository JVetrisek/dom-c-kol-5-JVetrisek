import React, { useState } from 'react';
import { useShoppingList } from '../../context/shoppingListProvider';
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/locales/LanguageContext';
import '../ShoppingListCreateButton/shoppingListCreateButton.css';

const ShoppingListCreateButton = () => {
  const { selectedUser } = useUser();
  const { create } = useShoppingList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleCreateList = () => {
    if (!newListTitle.trim()) {
      alert(translations.shoppingListTitleCannotBeEmpty);
      return;
    }
    if (selectedUser) {
      create(newListTitle, selectedUser.id);
      setNewListTitle('');
      setIsModalOpen(false);
      navigate('/');
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="shopping-list-create">
      <button
        className="add-shoppinglist-button"
        onClick={() => setIsModalOpen(true)}
      >
        {translations.addNewShoppingList}
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{translations.createNewShoppingList}</h3>
            <input
              type="text"
              placeholder={translations.enterListTitle}
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                {translations.cancel}
              </button>
              <button
                className="create-button"
                onClick={handleCreateList}
              >
                {translations.create}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListCreateButton;