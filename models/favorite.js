const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    videoId: String,
    thumbnail: String,
    title: String,
    channelTitle: String,
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Favorite', favoriteSchema);