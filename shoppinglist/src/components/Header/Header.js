import React, { useState } from 'react';
import { useUser } from '../../context/userContext';
import './header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { Menu, Transition} from '@headlessui/react';
import { Fragment } from 'react';

const Header = () => {
    const { users, selectedUser, setSelectedUser } = useUser();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const navigate = useNavigate(); // Inicializujeme useNavigate

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setIsUserMenuOpen(false);
        navigate('/'); // Přesměrování na původní routu po změně uživatele
    };

    const handleLogoClick = () => {
        navigate('/'); // Přesměrování na ShoppingListsView
    };

    console.log("Selected User: ", selectedUser);
    console.log("Users: ", users);

    return (
        <header className="header">
            <button className="logo-button" onClick={handleLogoClick}>The Shoppinglist App</button>
            <div className='userLanguageSwitcherContainer'>
                <LanguageSwitcher></LanguageSwitcher>
                <div className="user-section">
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <i className="fa-regular fa-user me-2 text-blue-500" />
        <span>
          {selectedUser ? selectedUser.name : 'User'}
        </span>
        <svg
          className="ms-2 -me-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {users.map((user) => (
            <Menu.Item key={user.id}>
              {({ active }) => (
                <button
                  onClick={() => handleUserSelect(user)}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm`}
                >
                  {user.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
</div>
            </div>
            
        </header>
    );
};

export default Header;
