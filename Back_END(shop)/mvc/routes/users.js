const express = require('express');
const router = express.Router();
const middleware = require("./middleware/middleware");


const usersCtrl = require("../controllers/user");


router.post("/register",usersCtrl.registerUser);

router.post("/login",usersCtrl.loginUser);

router.get("/generate-feed", middleware.authorize, usersCtrl.generateFeed);

router.get("/getSearchResults", usersCtrl.getSearchResults);

router.delete("/all", usersCtrl.deleteAllUsers);

router.get("/insert-products", usersCtrl.insertProducts);

router.get("/upload-products", usersCtrl.uploadProductsForm);

module.exports = router;
