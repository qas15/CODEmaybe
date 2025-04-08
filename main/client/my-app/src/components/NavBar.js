import React, { useContext } from 'react';
import { Context } from '../AppContextProvider'; // Импорт контекста
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
<<<<<<< HEAD
import '../styles/NavBar.css'; // Подключаем файл с стилями
=======
import { logout } from '../http/userAPI';
>>>>>>> cf9b5c9fcb3325be6bc38280c009ebbd4b3e97eb

const NavBar = () => {
    const { user, setUser, setIsAuth } = useContext(Context); // Получаем user и setUser из контекста
    const navigate = useNavigate();

    const logOut = () => {
        logout().then((r) => {
            setUser({});  // Вызываем setUser, чтобы сбросить данные пользователя
            setIsAuth(false);  // Сбрасываем статус авторизации
        }).catch((e) => {});
    };

    const handleRedirect = () => {
        navigate('/');
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
                        onClick={() => navigate('/profiles')}
                        className="ms-2"
                    >
                        Профили
                    </Button>

                    {user.isAuth && (
                        <Button
                            variant="outline-light"
                            onClick={() => navigate('/profile')}
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
                            onClick={() => navigate('/login')}
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













