import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../AppContextProvider';
import {HandleSubmit} from "../http/userAPI";
import {get} from "../http"; // Импорт контекста
// import '../styles/Profile.css'; // Подключаем файл с стилями

import React, { useEffect, useState } from 'react';
import { ErrorResponse, getProfile } from '../http/userAPI';
import "../styles/Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // Состояние для режима редактирования
    const [updatedData, setUpdatedData] = useState({});  // Состояние для хранения изменений
    const { user } = useContext(Context);
    const email = user?.email;

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
    }, [email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const { name, surname, phone, hobbies, details, age } = updatedData;

            const response = await HandleSubmit(name, surname, userData?.age, phone, hobbies, details, email);

            if (response) {
                setUserData(updatedData);
                setIsEditing(false);
            }
        } catch (err) {
            setError(err.message);  // Обработка ошибки
        }
    };

    return (
        <div className="container-fluid bg-white mt-5 mb-5">
            <div className="row">
                {/* Левая часть с изображением профиля */}
                <div className="col-md-3 d-flex flex-column align-items-center text-center p-3 py-5">
                    <img
                        className="rounded-circle mt-5"
                        width="150px"
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt="User Avatar"
                    />
                    {userData ? (
                        <span className="font-weight-bold">{userData.name}</span>
                    ) : (
                        <span className="font-weight-bold">Загрузка...</span>
                    )}
                    {userData ? (
                        <span className="text-black-50">{userData.email}</span>
                    ) : (
                        <span className="text-black-50">Загрузка...</span>
                    )}
                </div>

                {/* Центральная часть с данными пользователя */}
                <div className="col-md-5 d-flex flex-column p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Профиль пользователя</h4>
                    </div>
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        userData && (
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Имя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Имя"
                                        name="name"
                                        value={isEditing ? updatedData.name : userData.name || ''}
                                        disabled={!isEditing}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Фамилия</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Фамилия"
                                        name="surname"
                                        value={isEditing ? updatedData.surname : userData.surname || ''}
                                        disabled={!isEditing}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )
                    )}

                    {userData && (
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Телефон</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Номер телефона"
                                    name="phone"
                                    value={isEditing ? updatedData.phone : userData.phone || ''}
                                    disabled={!isEditing}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Правая часть с дополнительной информацией */}
                <div className="col-md-4 d-flex flex-column p-3 py-5">
                    <div className="col-md-12">
                        <label className="labels">Хобби</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Нет хобби"
                            name="hobbies"
                            value={isEditing ? updatedData.hobbies : userData?.hobbies || ''}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>
                    <br />
                    <div className="col-md-12">
                        <label className="labels">Дополнительные детали</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Нет деталей"
                            name="details"
                            value={isEditing ? updatedData.details : userData?.details || ''}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Кнопки редактирования и сохранения */}
                    {!isEditing ? (
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => setIsEditing(true)}  // Включаем режим редактирования
                        >
                            Редактировать профиль
                        </button>
                    ) : (
                        <button
                            className="btn btn-success mt-3"
                            onClick={handleSave}  // Сохраняем изменения
                        >
                            Готово
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;



