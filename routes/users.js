const router = require('express').Router()
const userController = require('../controllers/userController')
const {ensureAuthenticated} = require('../auth/passport')

router.get('/join-private', userController.get_private)

router.post('/join-private', userController.post_private)

router.get('/logout-page', userController.get_logout_page)

router.get('/logout', userController.get_logout)

router.get('/create-post', userController.get_create_post)

router.post('/create-post', userController.create_post)

module.exports = router;