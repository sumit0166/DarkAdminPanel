const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./components/logger');
const config = require('./config/appConfig.json');
const getLogin = require('./components/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { userModel, productModel } = require('./components/dbModals');
const { getAllProducts } = require('./components/productService');



const app = express();
const upload = multer({ dest: 'tmp/' });

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
  app.use('/images', express.static('./imgs'));
  
  app.use((req, res, next) => {
    const origin = req.get('Origin');
    // const getRef = req.get('Referer');
    // let referer = getRef.substring(0, getRef.indexOf('/',7));
    
    logger.info(`Request received from ${origin} -> ${req.method} - ${req.url}`);

    if ( origin !== config.originHost) {
      logger.info(`response sent -> Forbidden`);
      return res.status(403).send('Forbidden');
    }
    next();
  });
  
  

// app.post('/uploadtoTemp', upload.single('image'), (req, res) => {
//   try {
//     const { path: filePath, originalname } = req.file;
//     logger.info(`Received file -> ${originalname} path -> ${filePath}`)

//     const destinationPath = 'imgs/'+originalname;
//     fs.renameSync(filePath, destinationPath);

//     logger.info(`File uploaded successfully to -> ${destinationPath}`)
//     res.json({opStatus:200, message: 'File uploaded successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.json({opStatus:500, error: 'Internal Server Error' });
//   }
// });

app.post('/uploadtoTemp', upload.single('image'), (req, res) => {
  try {
    const { path: filePath, originalname } = req.file;
    logger.info(`Received file -> ${originalname} upload path -> ${filePath}`)

    const destinationPath = 'imgs/'+originalname;
    fs.renameSync(filePath, destinationPath);
    let resp = {
      opStatus:200,
      tempPath: filePath,
      message: 'File uploaded successfully.'
    }

    logger.info(`Response Sent -> ${destinationPath}`)
    res.json(resp);
  } catch (err) {
    console.error(err);
    res.json({opStatus:500, error: 'Internal Server Error' });
  }
});

async function processFile(filePath, originalname, productName, filedest) {
  logger.info(`Received file -> ${originalname} upload path -> ${filePath}`);
  try {
    const destinationPath = `imgs/${productName}/${originalname}`;
    const destinationDirectory = `imgs/${productName}`;
    if (!fs.existsSync(destinationDirectory)) {
      logger.error(`Destination dorectory Not Found ${destinationDirectory}`)
      fs.mkdirSync(destinationDirectory, { recursive: true });
      logger.info(`Destination dir created sucessfully`);
    }
    fs.renameSync(filePath, destinationPath);
    logger.info(`File moved to -> ${destinationPath}`);
    filedest.push(destinationPath);
  } catch (error) {
    logger.error(error);
  }
  }

app.post('/test', upload.array('image'), async (req, res) => {
  var filedest = []
  try {
    const files = req.files;
    const productName = req.body.productname;

    if (files && files.length > 0) {
      await Promise.all(files.map(async (file) => {
        const { path: filePath, originalname } = file;
        await processFile(filePath, originalname, productName, filedest);
        logger.info(`files -> ${filedest}`);
      }));

      res.json({ opStatus: 200 ,message: 'Files processed successfully' });
    } else {
      res.json({ opStatus: 400, message: 'No files received' });
    }

  } catch (error) {
    res.status(500).json({opStatus:500})
  }
  
});

app.get('/getusers', (req, res) => {
  logger.warn("fetching users without authentication- no restriction found")
    userModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err))
})




app.get('/getProducts', (req, res) => {
  // if (req.query.operation) {
    
  // } else {
  //   res
  // }
  getAllProducts(req,res);
});







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
