//Allow users to delete their accounts
const router = require('express').Router();
const User = require('../models/users');

router.route('/:id').get((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Profile deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;