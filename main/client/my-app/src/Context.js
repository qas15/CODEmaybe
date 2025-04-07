// Context.js
import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    return (
        <Context.Provider value={{ user, setUser, isAuth, setIsAuth }}>
            {children}
        </Context.Provider>
    );
};
