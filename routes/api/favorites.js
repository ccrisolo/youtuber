const express = require('express')
const router = express.Router()
const Favorite = require('../../models/favorite')
const favCtrl = require('../../controllers/favorites')


router.get('/', favCtrl.index)
router.use(require('../../config/auth'));
router.post('/', checkAuth, favCtrl.create)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}


module.exports = router