const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: String,
    rollNo: String,
});

const students = mongoose.model('students', userSchema);

module.exports = students;