const mongoose = require('mongoose');

const IssuedSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Name: {
        type: String
    },
    author: {
        type: String
    },
    isbn: {
        type: String
    },
    issuedOn: {
        type: String
    },
    dueDate: {
        type: String
    },
    image: {
        type: String
    }
})


mongoose.model('IssuedBooks', IssuedSchema);