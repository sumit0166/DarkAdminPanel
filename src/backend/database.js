const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./userModel')

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/adminPanel');

app.get('/getusers', (req, res) => {
  userModel.find()
  .then( users => res.json(users))
  .catch( err => res.json(err))
})

app.post('/getLogin', (req, res) => {
  const operation = req.query.operation;

  switch (operation) {
    case "userAuth":
      console.log(req.body)
      var username = req.body.username;
      var passwd = req.body.passwd;
      userModel.findOne({username: username, passwd: passwd })
      .then( users => {
        if(users !== null){
          if(users.username == username && users.passwd == passwd){ 
            res.json({
              isAuthSuccesfull: true,
              roles: users.roles
            })
          } else {
            res.json({
              isAuthSuccesfull: false,
            })
          }

        } else {
          res.json({
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

      break;
  }

})

app.listen(3001, () => {
  console.log('server is running')
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