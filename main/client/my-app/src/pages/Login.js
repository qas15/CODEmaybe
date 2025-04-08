import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../http/userAPI'; // Импорт функции login
import { update } from '../AppContextProvider'; // Импорт контекста
import { Link } from 'react-router-dom'; // Импорт Link для навигации

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Выполняем авторизацию
            await login(email, password);
            await update();
            
            navigate('/'); // Перенаправление на страницу магазина
        } catch (e) {
            alert('Ошибка при входе: ' + e.message || 'Неизвестная ошибка');
        }
    };

    return (
        <Container>
            <Card className="p-4">
                <h2>Вход</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="mt-3">
                        Войти
                    </Button>
                </Form>
                <Row className="mt-3">
                    <Col>
                        <span>Нет аккаунта? </span>
                        <Link to="/register">Зарегистрироваться</Link>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Login;



