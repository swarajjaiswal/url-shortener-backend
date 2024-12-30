const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser')
const { restrictLogin } = require('./middleware/auth')

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

const DB = 'mongodb+srv://swaraj2005:Swaraj%40123@cluster0.gg4vp.mongodb.net/TestUrl?retryWrites=true&w=majority';

// mongoose.connect('mongodb://localhost:27017/TestUrl')
mongoose.connect(DB)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("not connected to MongoDB", err);
    });

app.use('/url', restrictLogin, urlRouter);
app.use('/', staticRoute)
app.use('/user', userRouter);

const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server Created");
});
