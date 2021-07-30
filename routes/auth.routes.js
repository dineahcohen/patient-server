const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../models/users');

/**
 * Sign In
 */
router.post('/login', (req, res, next) => {
    let getUser;
    userSchema
        .findOne({
            email: req.body.email,
        })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed',
                });
            }
            getUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((response) => {
            if (!response) {
                return res.status(401).json({
                    message: 'Authentication failed',
                });
            }
            let jwtToken = jwt.sign(
                {
                    email: getUser.email,
                    userId: getUser._id,
                },
                'longer-secret-is-better',
                {
                    expiresIn: '1h',
                }
            );
            res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                firstName: getUser.firstName,
                lastName: getUser.lastName,
                gender: getUser.gender,
                phone: getUser.phone,
                id: getUser._id
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        });
});

/**
 * Sign Up
 */
router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const user = new userSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            isDoctor: req.body.isDoctor,
            ip: IP
        });

        user.save()
            .then((response) => {
                res.status(201).json({
                    message: 'User created',
                    result: response
                })

            }).catch(error => {
                res.status(500).json({
                    error,
                })
            })
    })
})


module.exports = router;