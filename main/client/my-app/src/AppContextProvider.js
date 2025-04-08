// AppContextProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { ErrorResponse, getProfile } from './http/userAPI';

// Создаем контекст
export const Context = createContext(null);

export let update;

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuth: false,
        email: '',
        name: '',
        phone: '',
        age: -1,
    });

    update = async () => {
        console.log("Updating user!");
        
        const userData = await getProfile();
    
        if (userData instanceof ErrorResponse) {
            setUser({
                isAuth: false,
                email: '',
                name: '',
                phone: '',
                age: -1,
            });
    
            return;
        }
    
        setUser({
            isAuth: true,
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            age: userData.age,
        });
    }

    // Логика проверки авторизации (например, из JWT токена)
    useEffect(update, []);

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
};
export default AppContextProvider
