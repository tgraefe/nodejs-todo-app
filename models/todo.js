const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedByUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    finishedAt:{
        type: Date,
        required: false
    },
    dueDate:{
        type: Date
    }
});

module.exports = mongoose.model('Todo', todoSchema);
