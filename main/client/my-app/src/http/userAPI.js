import {get, post} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, surname, age, phone, email, password) => {
    const { data } = await post('api/auth/register', {
        username: name,
        surname,
        age,
        phone,
        email,
        password,
        role: 'USER',
        hobbies: null,
        details: null
    });

}

export const login = async (email, password) => {
    const { data } = await post('api/auth/login', { email, password });
}

export const check = async () => {
    const { data } = await get('api/user/auth');
    console.log("Ответ сервера на check():", data);

};
export const getUserByEmail = async (email) => {
    try {
        const encodedEmail = encodeURIComponent(email); // Кодируем email
        const response = await get(`api/user/my_profile`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        throw new Error('Ошибка при получении данных пользователя');
    }
};

export const HandleSubmit = async (name, surname, age, phone, hobbies, detailes, email) => {
    try {
        const encodedEmail = encodeURIComponent(email); // Кодируем email
        const response = await post(`api/user/update`, {name, surname, age, phone, hobbies, detailes, email});
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении обновлении профиля", error);
        throw new Error('Ошибка при получении обновления данных');
    }
}
