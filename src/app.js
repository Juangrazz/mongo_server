const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const config = require('./keys.js');

const app = express();

app.set('port', config.PORT);

app.use(cors({ origin: config.SERVER }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/server/user", require('./routes/user.routes'));
app.use("/server/cities", require('./routes/cities.routes'));
app.use("/server/sports", require('./routes/sports.routes'));

module.exports = app;