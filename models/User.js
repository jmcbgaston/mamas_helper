const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    handle: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    household: {
        type: Array,
        default: []
    },
    isLimitedUser: {
        type: Boolean,
        default: false
    },
    assignedTasks: {
        type: Array,
        default: [] 
    },
    parentId: ObjectId
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema); 