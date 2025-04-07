import axios from 'axios';

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

