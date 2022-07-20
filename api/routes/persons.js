const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/user-controller');
const controllerPerson = require('../controllers/person-controller');


router.get('/', controllerUser.verifyJWT, controllerPerson.getAllPersons);

router.post('/', controllerUser.verifyJWT, controllerPerson.createPerson);

router.get('/:id', controllerUser.verifyJWT, controllerPerson.getByIDPerson);

router.delete('/:id', controllerUser.verifyJWT, controllerPerson.deletePerson);


module.exports = router;