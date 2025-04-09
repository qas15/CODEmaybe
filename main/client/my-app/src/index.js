import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './AppContextProvider';  // Импортируем AppContextProvider
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>
);








