import React, { useContext } from 'react';
import { Context } from '../AppContextProvider'; // Импорт контекста
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
    const { user, setUser, setIsAuth } = useContext(Context); // Получаем user и setUser из контекста
    const history = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        setUser({});  // Вызываем setUser, чтобы сбросить данные пользователя
        setIsAuth(false);  // Сбрасываем статус авторизации
    };

    const handleRedirect = () => {
        history('/');
        setTimeout(() => {
            window.location.reload();
        }, 200);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav.Link
                    className="LOGO"
                    to="/"
                    onClick={handleRedirect}
                >
                    SITE
                </Nav.Link>
                <Nav className="ml-auto" style={{ color: 'white' }}>
                    <Button
                        variant="outline-light"
                        onClick={() => history('/profiles')}
                        className="ms-2"
                    >
                        Профили
                    </Button>

                    {user.isAuth && (
                        <Button
                            variant="outline-light"
                            onClick={() => history('/profile')}
                            className="ms-2"
                        >
                            Профиль
                        </Button>
                    )}

                    {user.isAuth ? (
                        <Button
                            variant="outline-light"
                            onClick={logOut}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    ) : (
                        <Button
                            variant="outline-light"
                            onClick={() => history('/login')}
                            className="ms-2"
                        >
                            Авторизация
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;












