const usersRouter = require('express').Router();

const {
    checkIsUserExists, checkEmptyNameAndEmailAndPassword, hashPassword, createUser, checkEmptyNameAndEmail,
    updateUser, deleteUser, sendUserDeleted, filterPassword, findUserById, sendUserById, findAllUsers
} = require("../middlewares/users");
const {checkAuth} = require("../middlewares/auth");
const {sendUserCreated, sendUserUpdated, sendMe, sendAllUsers} = require("../controllers/users");

usersRouter.get('/users', findAllUsers, sendAllUsers);

usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
);
usersRouter.put(
    "/users/:id",
    checkEmptyNameAndEmail,
    checkAuth,
    updateUser,
    sendUserUpdated
);
usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
);

usersRouter.get("/me", checkAuth, sendMe);

usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);

usersRouter.get("/users/:id", findUserById, sendUserById);

module.exports = usersRouter;
  