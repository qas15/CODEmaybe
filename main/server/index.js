require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const {User} = require("./models/models");

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();  // Получаем всех пользователей из базы данных
        res.json(users);  // Отправляем пользователей в ответ
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Ошибка при получении данных');
    }
});
app.use(errorHandler) //middleware

app.use('/static', express.static(path.resolve(__dirname, 'static')));
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}



start()






