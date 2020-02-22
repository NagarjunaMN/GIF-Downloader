const express = require('express');
const app = express();
const session = require('express-session')
const hbs = require('hbs');


const middlewares = require('./middlewares/middleware')
const gifController = require('./Controllers/gifController')
const loggedController = require('./Controllers/logged')


app.use(session({
    secret:"myappsecret",
    saveUninitialized:false,
    resave:false,
    cookie:{maxage:10000000000}
}))

app.set('views',__dirname+'/views');;
app.set('view engine','hbs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname+'/static'))
hbs.registerPartials(__dirname+'/views/partials')


app.use(middlewares.logger)

// gif controller
app.get('/gif',gifController.home)

app.post('/gif',gifController.getGif)

app.get('/gif/image/:alias/:name',gifController.getOneGif)

app.get('/gif/next',gifController.nextGif)

app.get('/gif/download/:alias/:name',gifController.download)

//logged controller

app.get('/gif/login',loggedController.login)

app.post('/gif/login',loggedController.doLogin)

app.get('/gif/signup',loggedController.signup)

app.post('/gif/signup',loggedController.doSignup)  

app.get('/gif/logout',loggedController.logout)


app.use(middlewares.notFound)
app.use(middlewares.errHandler)


app.listen(2406,() => {console.log("server is running dude on your birth date and month")})