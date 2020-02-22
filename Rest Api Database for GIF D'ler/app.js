const express = require('express');
const app = express()
const mongoose = require('mongoose');

const userRoutes = require('./users/userRoutes')


mongoose.connect('mongodb://localhost:27017/GIF',{useUnifiedTopology:true,useNewUrlParser:true})
    .then(data => console.log("DB connected"))
    .catch(err => console.log("Something wrong with DB",err))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
    

app.use('/api/users',userRoutes)

app.listen(3002,function () {
    console.log("API running in 3002")
})