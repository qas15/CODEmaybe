import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../AppContextProvider';
import { ErrorResponse, getProfile, HandleSubmit } from '../http/userAPI';
import "../styles/Profile.css";
import profileLogo from '../static/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getProfile();
                if (response instanceof ErrorResponse) {
                    setError(response.message);
                    return;
                }
                setUserData(response);
            } catch (err) {
                setError('Ошибка загрузки данных');
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            await HandleSubmit(userData.name, 0,userData.phone, userData.email, 0, 0, 0);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="profile-screen">
            <div className="profile-card">
                <div className="avatar-block">
                    <img src={profileLogo} alt="Аватар" className="avatar" />
                </div>

                <div className="profile-content">
                    <h2 className="profile-title">Мой профиль</h2>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Имя и фамилия</label>
                        <input
                            type="text"
                            name="name"
                            value={userData?.name || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label>Телефон</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData?.phone || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={userData?.email || ''}
                            disabled
                        />
                    </div>

                    <div className="actions">
                        {!isEditing ? (
                            <button
                                className="edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Редактировать
                            </button>
                        ) : (
                            <>
                                <button
                                    className="save-btn"
                                    onClick={handleSave}
                                >
                                    Сохранить
                                </button>
                                <button
                                    className="cancel-btn"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Отмена
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;




