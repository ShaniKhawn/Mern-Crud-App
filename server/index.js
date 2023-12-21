const express = require('express');
const cors = require("cors");
require('./models/db');

const User = require("./models/user");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// routers
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/customers', require('./routes/customers'));

app.listen(9002, () => {
    console.log(`App running on port 9002`)
});