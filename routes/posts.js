const router = require('express').Router()

const postController = require('../controllers/postController')

//get home page
router.get('/', postController.index)

//get signup page
router.get('/sign-up', postController.get_signup)

//post signup
router.post('/sign-up', postController.post_signup)

//get login page
router.get('/log-in', postController.get_login)

//post login form
router.post('/log-in', postController.post_login)

router.delete('/posts/:postId', postController.delete_post)

module.exports = router