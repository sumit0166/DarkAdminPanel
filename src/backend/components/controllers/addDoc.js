const logger = require("../logger");
const { userModel } = require('../modals/users')
const jwt = require('jsonwebtoken');


const secretKey = "nodeJaApp@8082forwebsite";


const addUser = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        let resp = {
            opStatus: 500,
            message: 'Empty body received'
        }
        looger.info(`Empty body received - Response sent -> ${resp}`);
        res.json(resp);
    }
    // var username = req.body.username;
    // var passwd = req.body.passwd;
    // var roles = req.body.passwd;
    console.log(req.body);
    userModel.create(req.body)
        .then(() => {
            let resp= {
                opStatus: 200,
                message: 'User added sucessfully'
            }
            logger.info(`Reponse Sent -> ${JSON.stringify(resp)}`)
            res.json(resp);
        })
        .catch(err => {
            if (err.code === 11000 && err.name === 'MongoServerError') {
                // Duplicate key error, handle accordingly
                let resp = {
                    statusCode: 409, // Conflict
                    message: 'Duplicate key error. Username already exists.'
                };
                logger.error(`MongoDB Error: ${err.message}. Response sent -> ${JSON.stringify(resp)}`);
                res.json(resp);
            } else {
                let resp = {
                    statusCode: 502,
                    message: `Databse Error - ${err}`
                }
                logger.error(`Error while adding in DB ${err} \n response sent -> ${JSON.stringify(resp)}`);
                res.json(resp);
            }
        })
}



module.exports = {
    addUser,
};