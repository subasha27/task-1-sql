const express = require("express");
const router = express.Router();
const { authschema, Sign } = require("../Models/models");
const functi = require('../Controller/function');


router.post('/createIt',functi.createUser);
router.put('/createIt/:id',functi.updateUser);
router.delete('/createIt/:id',functi.deleteUser);
router.get('/getIt/:id',functi.getUser);
router.get('/getAll',functi.getAllUser);

module.exports = router;
