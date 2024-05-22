const users = require("../models/user");
const bcrypt = require("bcryptjs");
const games = require("../models/game");

const createUser = async (req, res, next) => {
    try {
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.status(400).send("Ошибка при создании пользователя");
    }
};

const findAllUsers = async (req, res, next) => {
    req.usersArray = await users.find({});
    next();
}

const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
        req.user = await users.findById(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
    }
};

const sendUserById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const deleteUser = async (req, res, next) => {
    console.log("DELETE /users/:id");
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
    }
};

const sendUserDeleted = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
        return req.body.email === user.email;
    });
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
    } else {
        next();
    }
};

const filterPassword = (req, res, next) => {
    const filterUser = (user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    };
    if (req.user) {
        req.user = filterUser(req.user);
    }
    if (req.usersArray) {
        req.usersArray = req.usersArray.map((user) => filterUser(user));
    }
    next();
};

const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
    } else {
        next();
    }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
    } else {
        next();
    }
};

const updateUser = async (req, res, next) => {
    try {
        req.user = await games.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка обновления игры" });
    }
};

module.exports = {
    findUserById,
    findAllUsers,
    createUser,
    sendUserById,
    deleteUser,
    sendUserDeleted,
    filterPassword,
    hashPassword,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    updateUser
};