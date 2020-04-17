let F = require('../models/favorite')
let U = require('../models/user')
//takes the form data from the front end(apiId, youtube url, userId) and creates an instance of a favorite

async function index(req, res) {
    const favorites = await F.find({});
    res.status(200).json(favorites);
}

async function create(req, res) {
    console.log(req.user, 'this is req.user');
    console.log(req.body, 'req.body before')
    req.body.user = req.user._id
    console.log(req.body, 'req.body')
    let newFavorite = await F.create(req.body);
    res.status(201).json(newFavorite);
}

async function deleteOne(req, res) {
    const deletedFavorite = await F.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedFavorite);
}


module.exports = {
    create,
    index,
    delete: deleteOne
}