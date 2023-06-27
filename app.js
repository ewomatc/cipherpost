require('dotenv').config()
const express = require('express')
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('./auth/passport.js')
const postRouter = require('./routes/posts.js')
const userRouter = require('./routes/users.js')

const app = express()

//database connection
const connectToDb = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    console.log('connected to database!')
  }
  catch(err) {
    console.log(`error connecting to database ...`, err.message);
  }
}
connectToDb()


//setup paths
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//setup session middlewares
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/', postRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})