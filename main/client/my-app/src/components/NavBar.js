import React, {useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../AppContextProvider'; // Импорт контекста
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'; // Добавим NavDropdown для выпадающих кнопок
import '../styles/NavBar.css'
import { logout } from '../http/userAPI';
import logo from '../static/t2_Logo_MonoWhite_sRGB_Preview.jpg';

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
    const useClickOutside = (ref, callback) => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };
        useEffect(() => {
            document.addEventListener("mousedown", handleClick);
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        });
    };

    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
        if (isOpen) setTimeout(() => setOpen(false), 50);
    });
    return (
        <Navbar bg="black" variant="dark" expand="lg">
            <Container>
                <Nav.Link
                    className="LOGO"
                    to="/"
                    onClick={handleRedirect}
                    style={{ color: 'white', fontWeight: 'bold' }}
                >
                    <img src={logo} alt="Logo" style={{ width: "120px" }}/>
                </Nav.Link>
                <Nav className="ml-auto" style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <header className="header">
                        <Button className="menu-button" onClick={() => setOpen(!isOpen)}>Меню
                        </Button>
                        <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <span onClick={() => navigate('/about')}>О нас</span>
                                </li>
                                <li className="menu__item">
                                    <span onClick={() => navigate('/tariffs')}>Тарифы</span>
                                </li>
                                <li className="menu__item">
                                    <span onClick={() => navigate('/partners')}>Партнеры</span>
                                </li>
                                <li className="menu__item">
                                    <span onClick={() => navigate('/reviews')}>Отзывы</span>
                                </li>
                            </ul>
                        </nav>
                    </header>
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

















