import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
};
export async function get(addr, data) {
    try {
        return (await fetch(`http://localhost:5000/${addr}?${new URLSearchParams(data)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })).json();
    } catch (e) {
        return Promise.reject(e);
    }
}

// и для POST запросов
export async function post(addr, data) {
    try {
        return (await fetch('http://localhost:5000/'+addr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })).json();
    } catch (e) {
        return Promise.reject(e);
    }
}

const errorInterceptor = (error) => {
    if (error.response && error.response.status === 401) {

        const currentPath = window.location.pathname;


        if (currentPath !== '/login') {

            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
};

$authHost.interceptors.request.use(authInterceptor);
$authHost.interceptors.response.use(response => response, errorInterceptor);

export { $host, $authHost };

