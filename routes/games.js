const gamesRouter = require('express').Router();

const {checkAuth} = require("../middlewares/auth.js");
const {
    checkIsGameExists,
    checkEmptyFields,
    createGame,
    findGameById,
    checkIsVoteRequest,
    checkIfCategoriesAvailable,
    checkIfUsersAreSafe,
    updateGame, deleteGame, findAllGames
} = require("../middlewares/games");
const {sendGameCreated, sendGameUpdated, sendGameDeleted, sendAllGames, sendGameById} = require("../controllers/games");

gamesRouter.get('/games', findAllGames, sendAllGames);

gamesRouter.post(
    "/games",
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvailable,
    checkEmptyFields,
    createGame,
    sendGameCreated
);

gamesRouter.get('/games/:id', findGameById, sendGameById);

gamesRouter.put(
    '/games/:id',
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    updateGame,
    sendGameUpdated,
    checkAuth
)

gamesRouter.delete(
    "/games/:id",
    checkAuth,
    deleteGame,
    sendGameDeleted
);

module.exports = gamesRouter;