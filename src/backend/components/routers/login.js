const express = require("express");

const { getLogin } = require('../controllers/auth');

const router = express.Router()

router.post('/getLogin', (req, res) => {
        getLogin(req, res);
    })

module.exports = router;