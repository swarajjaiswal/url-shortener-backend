const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const { restrictLogin } = require('./middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

const DB =process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(DB)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Not connected to MongoDB', err);
});

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Routes
app.use('/url', restrictLogin, urlRouter);
app.use('/', staticRoute);
app.use('/user', userRouter);

// Example user page
app.get('/userpage', (req, res) => {
    res.send('User Page available');
});

// Port setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server created on port', PORT);
});
