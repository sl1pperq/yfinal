const categoriesRouter = require('express').Router();

const {
    checkIsCategoryExists, checkEmptyName, createCategory, updateCategory, deleteCategory, sendCategoryDeleted,
    findCategoryById, findAllCategories
} = require("../middlewares/categories");
const {checkAuth} = require("../middlewares/auth");
const {sendCategoryCreated, sendCategoryUpdated, sendCategoryById, sendAllCategories} = require("../controllers/categories");

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);

categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);

categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
);
categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
);
categoriesRouter.delete(
    "/categories/:id",
    checkAuth,
    deleteCategory,
    sendCategoryDeleted
);

module.exports = categoriesRouter;