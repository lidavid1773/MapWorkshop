const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        maxlength: 30
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
        },
    visibility: {       
        type: Boolean,
        required: true
    },
    geodata: {
        type: Schema.Types.Mixed,
        required: true
    },
    downloads: {
        type: Number,
        default: 0
      },  
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    votes: [{ 
        vote_up: Boolean,
        vote_by: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' } 
    }]

});

module.exports = mongoose.model('Map', MapSchema);