import React, { useState } from 'react';
import { useItem } from '../../context/itemProvider';
import { useLanguage } from '../../context/locales/LanguageContext';
import './item.css';

const Item = ({ item }) => {
  const { toggleItemState, editItem, removeItem } = useItem();
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const { isLoading: isLoadingItems } = useItem();
  const { translations } = useLanguage();

  if (isLoadingItems) {
    return <div className="loading">{translations.loading}</div>;
  }

  const handleEditItem = () => {
    editItem(item.id, newTitle);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditItem();
    }
  };

  const handleRemoveItem = () => {
    if (window.confirm(translations.confirmRemoveItem)) {
      removeItem(item.id);
    }
  };

  const itemStyle = {
    color: item.state ? 'green' : 'white',
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid #ccc',
    margin: '5px 0',
    backgroundColor: item.state ? '#81eb88' : '#f7c3c6',
  };

  return (
    <div className="item-tile" style={itemStyle}>
      <div className="">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleEditItem}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div><h3 onClick={() => setEditing(true)}>{item.title}</h3></div>
        )}

        <div className="item-icons">
          <i
            className="fa-solid fa-check"
            style={{ color: '#577bbf' }}
            onClick={() => toggleItemState(item.id)}
          ></i>

          <i
            className="fa-regular fa-pen-to-square"
            style={{ color: '#577bbf' }}
            onClick={() => setEditing(true)}
          ></i>

          <i
            className="fa-solid fa-trash"
            style={{ color: '#577bbf' }}
            onClick={handleRemoveItem}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Item;