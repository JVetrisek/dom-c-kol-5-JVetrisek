import React from 'react';
import './shoppingListCard.css';
import { useUser } from '../../context/userContext';
import { useShoppingList } from '../../context/shoppingListProvider';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/locales/LanguageContext';

const ShoppingListCard = ({ shoppingList }) => {
  const { selectedUser } = useUser();
  const { findUserById } = useUser();
  const owner = findUserById(shoppingList.ownerId);
  const members = shoppingList.membersIds;
  const { deleteList } = useShoppingList();
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm(translations.confirmDeleteShoppingList)) {
      deleteList(shoppingList.id);
      navigate('/');
    }
  };

  return (
    <div className="shopping-list-card">
      <div className='title-flex'>
        <h2 className="shopping-list-title">{shoppingList.title}</h2>
        {shoppingList.archive === true && (
          <div className='archive-node'>{translations.archived}</div>
        )}
      </div>
      <h4 className="shopping-list-owner">{translations.owner}: {owner.name}</h4>
      <h5 className="shopping-list-members">{translations.members}:</h5>
      <div className="card-bottom-flex">
        <ul className="members-list">
          {members.map(memberId => {
            const member = findUserById(memberId);
            return (
              <li key={memberId}>
                {member ? member.name : translations.unknownMember}
              </li>
            );
          })}
        </ul>
        {selectedUser && selectedUser.id === shoppingList.ownerId && (
          <button onClick={handleDelete} className="delete-button">
            {translations.delete}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShoppingListCard;