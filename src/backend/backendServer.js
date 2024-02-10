const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./components/userModel')
const logger = require('./components/logger');
const config = require('./config/appConfig.json');



const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://'+config.dbHost+':'+ config.port +'/'+ config.dbName);

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request at ${req.url}`);
  next();
});

app.get('/getusers', (req, res) => {
  logger.warn("fetching users without authentication- no restriction found")
  userModel.find()
  .then( users => res.json(users))
  .catch( err => res.json(err))
})

app.post('/getLogin', (req, res) => {
  const operation = req.query.operation;
  switch (operation) {
    case "userAuth":
      logger.info(`-- Operation: POST -- BODY: ${JSON.stringify(req.body)}`)
      var username = req.body.username;
      var passwd = req.body.passwd;
      userModel.findOne({username: username })
      .then( users => {
        if(users !== null){
          if(users.username == username && users.passwd == passwd){ 
            let response = {
              statusCode: 200,
              isAuthSuccesfull: true,
              roles: users.roles
            }
            logger.info(`Authentication sucessful \n Response: ${JSON.stringify(response)}`)
            res.json(response)
          } else {

            let response ={
              statusCode: 200,
              isAuthSuccesfull: false,
            }

            logger.info(`Authentication sucessful \n Response: ${JSON.stringify(response)}`)
            res.json(response)
          }

        } else {
          logger.info(">> Match not found in db")
          res.json({
            statusCode: 201,
            isAuthSuccesfull: false,
          })
        }
        
      })
      .catch( err => {
        console.log(err);
        res.json(err);
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

})

app.listen(config.serverPort, () => {
  logger.info(`server is running on port > ${config.serverPort}`);
})












// const MongoClient = require('mongodb').MongoClient;

// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri);

// client.connect(err => {
//   if (err) throw err;

//   const db = client.db('adminPanel');
//   const collection = db.collection('users');

//   collection.find({}).toArray((err, docs) => {
//     if (err) throw err;

//     console.log(docs);

//     client.close();
//   });
// });