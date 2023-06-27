const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/join-private', userController.get_private)

router.post('/join-private', userController.post_private)

router.get('/logout-page', userController.get_logout_page)

router.get('/logout', userController.get_logout)

module.exports = router;