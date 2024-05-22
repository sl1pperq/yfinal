const gamesRouter = require('express').Router();

const { checkAuth } = require("../middlewares/auth.js");
const {
    checkIsGameExists,
    checkEmptyFields,
    createGame,
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    updateGame, deleteGame, findAllGames
} = require("../middlewares/games");
const {sendGameCreated, sendGameUpdated, sendGameDeleted, sendAllGames} = require("../controllers/games");
const {checkIfCategoriesAvaliable} = require("../middlewares/categories");

gamesRouter.get('/games', findAllGames, sendAllGames);

gamesRouter.post(
    "/games",
    findAllGames,
    checkIsGameExists,
    checkEmptyFields,
    createGame,
    sendGameCreated
);

gamesRouter.put(
    "/games/:id",
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    updateGame,
    sendGameUpdated
)

gamesRouter.delete(
    "/games/:id",
    checkAuth,
    deleteGame,
    sendGameDeleted
);

module.exports = gamesRouter;