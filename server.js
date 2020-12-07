const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// HEROKU -steps

const app = express();
const PORT = process.env.PORT || 8080; // STEP 1

const routes = require('./routes/api');

// STEP 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongoose connected")
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

// STEP 3
if(process.env.NODE_ENV === 'production'){
    // build folderin servere daxil etmek uchun
    app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting on ${PORT}`));