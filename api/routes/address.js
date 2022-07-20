const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/user-controller');
const controllerAddress = require('../controllers/address-controller');


router.get('/', controllerUser.verifyJWT, controllerAddress.getAllAddress);

router.post('/', controllerUser.verifyJWT, controllerAddress.createAddress);

router.get('/:id', controllerUser.verifyJWT, controllerAddress.getByIDAddress);

router.delete('/:id', controllerUser.verifyJWT, controllerAddress.deleteAddress);


module.exports = router;