// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { UserProvider } from './context/userContext';
import { ShoppingListProvider } from './context/shoppingListProvider';
import { ItemProvider } from './context/itemProvider'; // Importujeme ItemProvider
import ShoppingListsView from './components/ShoppingListOverviewList/ShoppingListsView';
import ShoppingListDetail from './components/ShoppingListDetail/ShoppingListDetail'; // Import detailní komponenty
import { LanguageProvider } from './context/locales/LanguageContext';

const App = () => {
    return (
        <LanguageProvider>
            <UserProvider>
                <ShoppingListProvider>
                    <ItemProvider> {/* Zabalíme aplikaci do ItemProvider */}
                        <Router>
                            <div className="app">
                                <Header />
                                <Routes>
                                    <Route path="/" element={<ShoppingListsView />} />
                                    <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
                                </Routes>
                            </div>
                        </Router>
                    </ItemProvider>
                </ShoppingListProvider>
            </UserProvider>
        </LanguageProvider>
        
    );
};

export default App;
