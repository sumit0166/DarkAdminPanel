const logger = require("../logger");
const { userModel } = require('../modals/users')



const getLogin = (req, res) =>{
  const operation = req.query.operation;
  switch (operation) {
    case "userAuth":
      logger.info(`--Reuest info:\n   Method : POST\n   Operation : ${operation}\n   BODY: ${JSON.stringify(req.body, null, 2)}`)
      var username = req.body.username;
      var passwd = req.body.passwd;
      userModel.findOne({ username: username })
        .then(users => {
          
          if (users !== null) {
            if (users.username == username && users.passwd == passwd) {
              let resp = {
                statusCode: 200,
                isAuthSuccesfull: true,
                roles: users.roles
              }
              logger.info(`Authentication sucessful \n Response sent -> ${JSON.stringify(resp)}`)
              res.json(resp)
            } else {
              let resp = {
                statusCode: 200,
                isAuthSuccesfull: false,
              }
              logger.info(`Authentication failed \n Response sent -> ${JSON.stringify(resp)}`)
              res.json(resp)
            }
          } else {
            let resp = {
              statusCode: 2001,
              isAuthSuccesfull: false,
            }
            logger.info(`>> Match not found in db \n response sent -> ${JSON.stringify(resp)} `)
            res.json(resp)
          }
        })
        .catch(err => {
          let resp = {
            statusCode: 502,
            error: err
          }
          logger.error(`Databse Error ${err} \n response sent -> ${JSON.stringify(resp)}`);
          res.json(resp);
        })

      break;

    default:
      let response = {
        statusCode: 400,
        description: 'operation not found'
      }
      logger.info(`operatin not found, res  josn ${response}`);
      res.json(response)
      break;
  }
}



module.exports = {
  getLogin,
};