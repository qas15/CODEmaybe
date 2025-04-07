import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './AppContextProvider';  // Импортируем AppContextProvider
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppContextProvider>  {/* Оборачиваем приложение в провайдер контекста */}
        <App />
    </AppContextProvider>
);








