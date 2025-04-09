import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../http/userAPI';
import { update } from '../AppContextProvider';
import { Link } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            await update();
            navigate('/');
        } catch (e) {
            alert('Ошибка при входе: ' + e.message || 'Неизвестная ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="login-container">
            <Card className="login-card">
                <div className="login-header">
                    <h2 className="login-title">Вход в систему</h2>
                </div>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group className="mb-4">
                        <Form.Label className="login-label">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="login-label">Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span className="button-content">
                            {isLoading ? 'Вход...' : 'Войти'}
                        </span>
                        <span className={`button-slide ${isHovered ? 'slide-in' : ''}`}></span>
                    </Button>

                    <Row className="mt-4 login-footer">
                        <Col className="text-center">
                            <span className="login-footer-text">Нет аккаунта? </span>
                            <Link to="/register" className="login-footer-link">Зарегистрироваться</Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;



