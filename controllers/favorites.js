let F = require('../models/favorite')
let U = require('../models/user')
//takes the form data from the front end(apiId, youtube url, userId) and creates an instance of a favorite

async function create(req, res) {
    console.log('if below returns undefined check back on user auth');
    console.log(req.user);
    console.log(req);
    let newFavorite = await F.create(req.body);
    res.status(201).json(newFavorite);

}

module.exports = {
    create
}