const mongoose = require('mongoose');

// BUILD THE MONGO URI CONNECTION STRING
const { username, password, projectname } = require('../config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.vgofkuz.mongodb.net/${projectname}?retryWrites=true&w=majority`;

// CONNECT TO MONGO DB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Succesful connection to Mongo DB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { connectDB }; 