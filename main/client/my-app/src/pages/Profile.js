import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../AppContextProvider'; // Импорт контекста
import '../styles/Profile.css'; // Подключаем файл с стилями

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const { user } = useContext(Context);
    const email = user?.email;

    useEffect(() => {
        if (!email) {
            window.location.reload()
            setError('Email not available');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${email}`);

                if (response.status === 200) {
                    setUserData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('User not found');
                } else {
                    setError(err.message);
                }
            }
        };

        fetchUserData();
    }, [email]);
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

