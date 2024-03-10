const express = require("express");
const multer = require('multer');

const { uploadProduct, manageProductRequest } = require('../controllers/product');



const upload = multer({ dest: 'tmp/' });
const router = express.Router()

router.post("/uploadProduct", upload.array('image'), async (req, res) => {
        uploadProduct(req, res);
    });

router.get('/getProducts', (req, res) => {
    manageProductRequest(req, res);
});

module.exports = router;
