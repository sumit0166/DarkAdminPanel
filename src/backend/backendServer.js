const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./components/userModel')
const logger = require('./components/logger');
const config = require('./config/appConfig.json');
const getLogin = require('./components/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const app = express();
const upload = multer({ dest: 'uploads/' });

// app.use(cors());
const corsOptions = {
  origin: config.originHost,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://' + config.dbHost + ':' + config.port + '/' + config.dbName)
  .then(() => {
    logger.info('Connected to MongoDB');
    
  })
  .catch((error) => {
    logger.error(`Database connection error: ${error.message}`);
    // process.exit(1); // Exit the application on connection error
  });


app.use((req, res, next) => {
  const origin = req.get('Origin');
  logger.info(`Request received from ${origin} - ${req.method} - ${req.url}`);
  if ( origin !== config.originHost) {
    return res.status(403).send('Forbidden');
  }
  next();
});


app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const { path: filePath, originalname } = req.file;
    logger.info(`Received file -> ${originalname} path -> ${filePath}`)
    // Move the file to a specific directory (optional)
    const destinationPath = 'imgs/'+originalname;
    fs.renameSync(filePath, destinationPath);
    // fs.unlink(filePath, function (err) {
    //   if (err) logger.error(`File delete Error -> ${err}`);
    //   logger.info(`${filePath} File deleted!`);
    // });
    // Respond with success

    logger.info(`File uploaded successfully to -> ${destinationPath}`)
    res.json({opStatus:200, message: 'File uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.json({opStatus:500, error: 'Internal Server Error' });
  }
});


app.get('/getusers', (req, res) => {
  logger.warn("fetching users without authentication- no restriction found")
    userModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err))
})

app.post('/getLogin', (req, res) => {
    getLogin(req, res);
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