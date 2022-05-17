//Initializing Mongoose
const mongoose = require('mongoose');

//Connceting MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/livefitwithlisa-db');

//Exporting to server.js
module.exports = mongoose.connection;