import React, { useState, useContext } from 'react';
import { Container, Form, Button, Row, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registration } from "../http/userAPI";
import { Context } from "../AppContextProvider";  // Импорт контекста

const Register = () => {
    const { user, setUser, setIsAuth } = useContext(Context);
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

        setUser(userData);
        setIsAuth(true);  // Устанавливаем пользователя как аутентифицированного

            // Перенаправление на главную страницу
        navigate("/");
    };

    return (
        <Container>
            <Card className="p-4">
                <h2>Регистрация</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Возраст"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Телефон"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    <Row>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Зарегистрироваться"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Register;



