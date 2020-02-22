const router = require('express').Router();
const userController = require('./userController')


router.post('/signup',userController.insertUser)
router.post('/signin',userController.findUser)

module.exports = router;