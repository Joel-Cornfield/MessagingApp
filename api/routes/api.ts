const express = require("express");
const router = express.Router();

const routeController = require("../controllers/routeController");

router.get("/users", routeController.users_get);
router.get("/messages", routeController.messages_get);

module.exports = router;