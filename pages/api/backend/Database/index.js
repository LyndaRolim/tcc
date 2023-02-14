const mongoose = require("mongoose");
require('dotenv').config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(''+process.env.DB_URL, options);
mongoose.Promise = global.Promise;

module.exports = mongoose;