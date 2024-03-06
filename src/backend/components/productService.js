const logger = require("./logger");
const { productModel } = require('./dbModals')


function getAllProducts(req, res) {
    productModel.find()
    .then(products => {
      if(products){
        let respJson = {
          opStatus: 200,
          data: products
        }
        res.json(respJson);
        logger.info(`Response sent -> Data length:${products.length}`);
      } else {
        let respJson = {
          opStatus: 404,
          message: "Data not found"
        }
        res.json(respJson);
        logger.info(`Reponse sent -> ${respJson}`);
      }
    })
    .catch( error => {
      logger.error(`Error while fetching data from table ${error}`)
      res.json({
        error:error
      })
    })
}


module.exports = {
    getAllProducts: getAllProducts
}