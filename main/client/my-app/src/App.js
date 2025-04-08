import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './AppContextProvider';  // Импортируем Context
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import AppRouter from "./components/AppRouter";

const App = observer(() => {
    const { user, setUser } = useContext(Context); // Получаем user и setUser из контекста
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            check()  // Проверка на сервере
                .then(data => {
                    console.log('Ответ сервера в check():', data);
                    if (data) {
                        setUser({ // Используем setUser для обновления состояния пользователя
                            isAuth: true,
                            email: data.email, // Предположим, что сервер возвращает email
                            // Добавьте другие данные, если нужно
                        });
                    } else {
                        setUser({ isAuth: false, email: '' });
                    }
                })
                .catch(() => {
                    setUser({ isAuth: false, email: '' }); // Очистка данных пользователя в случае ошибки
                    localStorage.removeItem('token');
                })
                .finally(() => setLoading(false));
        } else {
            setUser({ isAuth: false, email: '' });
            setLoading(false);
        }
    }, [setUser]);

    if (loading) {
        return <Spinner animation={'grow'} />; // Загружаем приложение
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});
//<Routes>
//<Route path="/login" element={<Login />} />
//<Route path="/register" element={<Register />} />
//<Route path="/" element={<Main />} />
//<Route path="/profile" element={<Profile />} />
//<Route path="/profiles" element={<Profiles />} />
//</Routes>
export default App;
















