import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './AppContextProvider';  // Импортируем Context
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import AppRouter from "./components/AppRouter";
import "./pages/HalvarBreitt2-XBd.woff"
import './pages/t2-Rooftop-Medium.woff'
import './pages/t2-Rooftop-Regular.woff'
import ChatBot from "./components/ChatBot";
import { RunningString } from './components/RunningString';

const App = observer(() => {
    const { user, setUser } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Теперь работает, т.к. App обернут в Router
    const isAboutPage = location.pathname === '/about';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            check()
                .then(data => {
                    if (data) {
                        setUser({ isAuth: true, email: data.email });
                    } else {
                        setUser({ isAuth: false, email: '' });
                    }
                })
                .catch(() => {
                    setUser({ isAuth: false, email: '' });
                    localStorage.removeItem('token');
                })
                .finally(() => setLoading(false));
        } else {
            setUser({ isAuth: false, email: '' });
            setLoading(false);
        }
    }, [setUser]);

    if (loading) {
        return <Spinner animation="grow" />;
    }

    return (
        <>
            <NavBar />
            {!isAboutPage && <RunningString text="t2 — быстрый, выгодный и надежный мобильный оператор!" />}
            <AppRouter />
            <ChatBot />
        </>
    );
});

export default App;

// <Routes>
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />
// <Route path="/" element={<Main />} />
// <Route path="/profile" element={<Profile />} />
// <Route path="/profiles" element={<Profiles />} />
// </Routes>















