const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};


class UserController {
    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;  // Получаем email из параметров URL
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            return res.json(user);  // Отправляем найденного пользователя
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
        }
    }

    async registration(req, res, next) {
        const { name, surname, age, phone, email, password, role, hobbies, details } = req.body;

        // Проверяем, что все обязательные параметры переданы
        if (!name || !surname || !email || !password || !age || !phone) {
            return next(ApiError.badRequest('Некорректные данные для регистрации'));
        }

        // Проверка на существование пользователя с таким email
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        // Хеширование пароля
        const hashPassword = await bcrypt.hash(password, 5);

        // Создаем нового пользователя
        const user = await User.create({
            name,
            surname,
            age,
            phone,
            email,
            password: hashPassword,
            role: role || 'USER',
            hobbies: hobbies,
            details: details
        });


        // Генерация JWT токена
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
    async updateProfile(req, res, next) {
        try {
            const { name, surname, age, phone, hobbies, details, email } = req.body;  // Данные, которые мы хотим обновить

            // Проверка на обязательные поля
            if (!name || !surname || !age || !phone) {
                return next(ApiError.badRequest('Некорректные данные для обновления профиля'));
            }

            // Находим пользователя по его ID
            const user = await this.getUserByEmail(email);
            if (!user) {
                return console.log('Пользователь не найден')
            }
            console.log(user)
            // Обновляем информацию о пользователе
            user.name = name || user.name;
            user.surname = surname || user.surname;
            user.age = age || user.age;
            user.phone = phone || user.phone;
            user.hobbies = hobbies || user.hobbies;
            user.details = details || user.details;

            // Сохраняем изменения в базе данных
            await user.save();

            // Возвращаем обновленного пользователя
            return res.json(user);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при обновлении данных пользователя' });
        }
    }
}

module.exports = new UserController();


