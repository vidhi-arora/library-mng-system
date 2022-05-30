const mongoose = require('mongoose');

const ReturnBooksSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
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
    returnedOn: {
        type: String
    },
    fine: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
})


mongoose.model('ReturnedBooks', ReturnBooksSchema);