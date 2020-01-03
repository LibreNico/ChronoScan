const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const UserRoll = require('../models/user')

/*
====================   JWT Config =====================
*/
//http://travistidwell.com/jsencrypt/demo/ >> watch out the key size must 512bit
var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');

const signOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    audience: 'http://mysoftcorp.in',
    expiresIn: "48h",
    algorithm: "RS256"
};
/*
====================   JWT Signing =====================
*/

var payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4",
};
const token = jwt.sign(payload, privateKEY, signOptions);

/*
 ====================   JWT Verify =====================
*/
const verify = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, publicKEY, signOptions, function (err, verify) {
            if (err) {
                res.status(400).json({
                    "msg": "Error Occurred " + err
                })
            } else {
                console.log(verify)
                next();
            }
        });
    } catch (error) {
        res.status(400).json({
            "msg": "Auth token failed or invalid"
        })
    }
}

/* GET users listing. */
router.get('/:id', verify, function (req, res, next) {

    console.log(JSON.stringify(req.headers.authorization));
    var id = req.params.id

    UserRoll.findOne({ 'name': id }, function (error, data) {
        if (error) {
            res.send({
                'code': 400,
                'data': error
            })
        } else {
            res.send({
                'code': 200,
                'data': data.status
            })
        }
    })

});

/* POST users listing. */
router.post('/', function (req, res, next) {

    var name = req.body.name
    var status = req.body.status

    const userRoll = new UserRoll()
    userRoll.name = name;
    userRoll.status = status

    userRoll.save({}, function (error, data) {
        if (!error) {
            return res.send({
                'code': 200,
                'token': token,
                'data': data
            })
        }
        return res.send({
            'code': 400,
            'data': error
        })
    });
});

module.exports = router;