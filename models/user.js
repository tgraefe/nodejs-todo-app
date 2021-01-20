const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarImgUrl: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    todos: [
        {
            todoId: {
                type: Schema.Types.ObjectId,
                ref: 'Todo',
                required: true,
            },
        },
    ],
    stats: {
        finishedCnt : Number,
        inTime: Number,
        finishedTodos:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo',
                required: true,
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);
