const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:12345@cluster0.ohs3e.mongodb.net/Final?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to Mongoose');
    } catch (error) {
        console.log(err);
    }
};

module.exports = connectDB;