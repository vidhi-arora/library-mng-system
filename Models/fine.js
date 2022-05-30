const mongoose = require('mongoose');

const FineSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fine: {
        type: Number,
        default: 0
    }
})

mongoose.model('Fine', FineSchema);