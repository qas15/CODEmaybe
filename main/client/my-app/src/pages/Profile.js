import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Запрос на сервер для получения данных пользователя по email
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/11%4011.com');
                setUser(response.data);  // Если пользователь найден, сохраняем его данные
                setError(null);           // Если ошибка, очищаем ошибку
            } catch (err) {
                setUser(null);            // Если ошибка, очищаем данные
                setError('Пользователь не найден');  // Устанавливаем сообщение об ошибке
            }
        };

        fetchUserData();
    }, []);  // Эффект выполняется при монтировании компонента

    return (
        <div>
            {error && <p>{error}</p>}  {/* Отображаем ошибку, если она есть */}
            {user ? (
                <div>
                    <h1>Данные пользователя</h1>
                    <p>Имя: {user.name}</p>
                    <p>Фамилия: {user.surname}</p> {/* Добавлено поле фамилии */}
                    <p>Возраст: {user.age}</p>       {/* Добавлено поле возраста */}
                    <p>Email: {user.email}</p>
                    <p>Телефон: {user.phone}</p>
                </div>
            ) : (
                <p>Загрузка...</p>  // Если данные еще загружаются, показываем загрузку
            )}
        </div>
    );
};

export default Profile;












