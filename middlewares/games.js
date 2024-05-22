const games = require("../models/game");


const findAllGames = async (req, res, next) => {
    if(req.query["categories.name"]) {
        req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
        next();
        return;
    }
    req.gamesArray = await games
        .find({})
        .populate("categories")
        .populate({
            path: "users",
            select: "-password"
        })
    next();
};

const createGame = async (req, res, next) => {
    console.log("POST /games");
    try {
        console.log(req.body);
        req.game = await games.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
    }
};

const findGameById = async (req, res, next) => {
    try {
        req.game = await games
            .findById(req.params.id)
            .populate("categories")
            .populate("users");
        next();
    } catch (error) {
        res.status(404).send({ message: "Игра не найдена" });
    }
};

const updateGame = async (req, res, next) => {
    try {
        req.game = await games.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка обновления игры" });
    }
};

const deleteGame = async (req, res, next) => {
    try {
        req.game = await games.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: "Error deleting game" });
    }
};

const checkEmptyFields = async (req, res, next) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.image ||
        !req.body.link ||
        !req.body.developer
    ) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
    } else {
        next();
    }
};

const checkIsGameExists = async (req, res, next) => {
    const isInArray = req.gamesArray.find((game) => {
        return req.body.title === game.title;
    });
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
    } else {
        next();
    }
};

const checkIsCategoryExists = async (req, res, next) => {
    const isInArray = req.categoriesArray.find((category) => {
        return req.body.name === category.name;
    });
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
    } else {
        next();
    }
};

const checkIfUsersAreSafe = async (req, res, next) => {
    if (!req.body.users) {
        next();
        return;
    }
    if (req.body.users.length - 1 === req.game.users.length) {
        next();
        return;
    } else {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
    }
};

const checkIsVoteRequest = async (req, res, next) => {
    if (req.isVoteRequest) {
        next();
        return;
    }
    if (Object.keys(req.body).length === 1 && req.body.users) {
        req.isVoteRequest = true;
    }
    next();
};


module.exports = {
    findGameById,
    findAllGames,
    checkIsCategoryExists,
    createGame,
    checkEmptyFields,
    checkIsGameExists,
    checkIfUsersAreSafe,
    checkIsVoteRequest,
    updateGame,
    deleteGame
};