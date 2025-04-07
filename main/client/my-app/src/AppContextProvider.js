// AppContextProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Создаем контекст
export const Context = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuth: false,
        email: '',
        // другие данные пользователя
    });

    const setIsAuth = (isAuth) => {
        setUser(prevUser => ({ ...prevUser, isAuth }));
    };

    const setUserEmail = (email) => {
        setUser(prevUser => ({ ...prevUser, email }));
    };

    // Логика проверки авторизации (например, из JWT токена)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = jwtDecode(token); // Декодируем JWT токен
            setUser({
                isAuth: true,
                email: userData.email,
            });
        }
    }, []);

    return (
        <Context.Provider value={{ user, setUser, setIsAuth, setUserEmail }}>
            {children}
        </Context.Provider>
    );
};
export default AppContextProvider
