import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const registration = async (name, surname, age, phone, email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/user/registration', {
        name,
        surname,
        age,
        phone,
        email,
        password,
        role: 'USER',
        hobbies: null,
        details: null
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    console.log("Ответ сервера на check():", data);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
export const getUserByEmail = async (email) => {
    try {
        const encodedEmail = encodeURIComponent(email); // Кодируем email
        const response = await axios.get(`http://localhost:5000/api/user/${encodedEmail}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        throw new Error('Ошибка при получении данных пользователя');
    }
};
