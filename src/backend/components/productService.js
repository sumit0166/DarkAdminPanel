const logger = require("./logger");
const { productModel } = require('./dbModals')


function getAllProducts(req, res) {
  const query = [
    {
      $facet: {
        uniqueVariants: [
          {
            $group: {
              _id: "$variant",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              variant: "$_id",
              count: 1
            }
          }
        ],
        uniqueType: [
          {
            $group: {
              _id: "$type",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              type: "$_id",
              count: 1
            }
          }
        ],
        uniqueProductType: [
          {
            $group: {
              _id: "$prdoductType",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              variant: "$_id",
              count: 1
            }
          }
        ],
        allData: [
          { $replaceRoot: { newRoot: "$$ROOT" } }
        ]
      }
    }
  ]

    productModel.aggregate(query)    
    // productModel.find() 
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