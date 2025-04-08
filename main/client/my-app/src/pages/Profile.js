import React, { useEffect, useState } from 'react';
import { ErrorResponse, getProfile } from '../http/userAPI';
import "../styles/Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Запрос на сервер для получения данных пользователя по email
        const fetchUserData = async () => {
            try {
                const response = await getProfile();

                if (response instanceof ErrorResponse) {
                    setUserData(null);
                    setError(response.message);
                    return;
                }

                setUserData(response); 
                 // Если пользователь найден, сохраняем его данные
                setError(null);           // Если ошибка, очищаем ошибку
            } catch (err) {
                setUserData(null);            // Если ошибка, очищаем данные
                setError('Пользователь не найден');  // Устанавливаем сообщение об ошибке
            }
        };

        fetchUserData();
    }, []);  // Эффект выполняется при монтировании компонента
  
    return (
        <div className="profile-container">
            <div className="profile-card">
                {error ? (
                    <p className="error-message">{error}</p>  // Показываем ошибку, если есть
                ) : (
                    userData && (
                        <div>
                            <h1>Данные пользователя</h1>
                            <div className="profile-info">
                                <p><span>Имя:</span> {userData.name}</p>
                                <p><span>Фамилия:</span> {userData.surname}</p>
                                <p><span>Возраст:</span> {userData.age}</p>
                                <p><span>Email:</span> {userData.email}</p>
                                <p><span>Телефон:</span> {userData.phone}</p>
                                <p><span>Детали:</span> {userData.details || 'Нет данных'}</p>
                                <p><span>Хобби:</span> {userData.hobbies || 'Нет данных'}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Profile;

