import React, { useState } from 'react';
import { Container, Form, Button, Row, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, registration } from "../http/userAPI";
import { update } from "../AppContextProvider";  // Импорт контекста
import "../styles/Register.css";

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();  // Хук для перенаправления

    const validateForm = () => {
        if (!email || !password || !name || !surname || !age || !phone) {
            setError('Пожалуйста, заполните все поля');
            return false;
        }
        // Простая валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Неверный формат email');
            return false;
        }
        // Валидация пароля (не менее 6 символов)
        if (password.length < 6) {
            setError('Пароль должен быть не менее 6 символов');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const userData = await registration(name, surname, age, phone, email, password);

        if (userData instanceof ErrorResponse) {
            console.log(userData);
            setError(userData.message);
            return;
        }

        await update();

        // Перенаправление на главную страницу
        navigate("/");
    };

    return (
        <Container className="register-container">
            <Card className="register-card">
                <div className="register-header">
                    <h2 className="register-title">Регистрация</h2>
                </div>
                <Form onSubmit={handleSubmit} className="register-form">
                    <Form.Control
                        className="register-input"
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="register-input"
                        type="text"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <Form.Control
                        className="register-input"
                        type="number"
                        placeholder="Возраст"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                    <Form.Control
                        className="register-input"
                        type="text"
                        placeholder="Телефон"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <Form.Control
                        className="register-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="register-input"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error && <div className="register-error">{error}</div>}
                    <Button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Зарегистрироваться"}
                    </Button>
                </ Form>
            </Card>
        </Container>
    );
};
export default Register;
