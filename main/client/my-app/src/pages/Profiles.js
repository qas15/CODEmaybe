import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import {get} from "../http";

const Profiles = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get('http://localhost:5000/api/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить пользователей');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Пустой массив зависимостей — запрос выполняется один раз при монтировании компонента

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" />
                <p>Загрузка пользователей...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center">
                <p style={{ color: 'red' }}>{error}</p>
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="text-center my-4">Список пользователей</h2>
            <Row>
                {users.map((user) => (
                    <Col key={user.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.name} {user.surname}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Телефон:</strong> {user.phone}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Возраст:</strong> {user.age}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Profiles;
