import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import { useShoppingList } from '../../context/shoppingListProvider';
import ShoppingListCard from '../ShoppingListCard/ShoppingListCard';
import ShoppingListCreate from '../ShoppingListCreateButton/ShoppingListCreateButton';
import { useLanguage } from '../../context/locales/LanguageContext'; // Import useLanguage hooku
import './shoppingListsView.css';

const ShoppingListOverview = () => {
  const { selectedUser } = useUser();
  const { isLoading, listByUser } = useShoppingList();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const { translations } = useLanguage(); // Použití useLanguage hooku

  useEffect(() => {
    if (selectedUser) {
      const lists = listByUser(selectedUser.id, showArchived);
      setShoppingLists(lists);
    } else {
      setShoppingLists([]);
    }
  }, [selectedUser, showArchived, listByUser]);

  if (isLoading) {
    return <div className="loading">{translations.loading || 'Načítám data...'}</div>;
  }

  return (
    <div className='shoppingListsTable'>
      {selectedUser && (
        <label>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
          {translations.showArchived || 'Show Archived'}
        </label>
      )}

      <div className='shoppinglist-gird'>
        {selectedUser ? (
          shoppingLists.length > 0 ? shoppingLists.map(list => (
            <div key={list.id}>
              <Link to={`/shopping-list/${list.id}`}>
                <ShoppingListCard shoppingList={list} />
              </Link>
            </div>
          )) : (
            <p>{translations.noShoppingLists || 'Žádné nákupní seznamy nenalezeny pro tohoto uživatele.'}</p>
          )
        ) : (
          <p>{translations.noUserSelected || 'Žádný uživatel není vybrán.'}</p>
        )}
      </div>
      <ShoppingListCreate />
    </div>
  );
};

export default ShoppingListOverview;