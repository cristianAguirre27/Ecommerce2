const router = require('express').Router();
const controller = require('../controllers/item.controller.js')
const authRequired = require('../middlewares/validateToken.js')

router.get("/items",controller.showItems);

router.get("/items/:id",controller.showOneItem);

router.post("/items",controller.createItems);

router.put("/items/:id",controller.updateItems);

router.delete("/items/:id",controller.deleteItem);

module.exports = router