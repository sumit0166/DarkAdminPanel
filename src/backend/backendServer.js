const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { exit } = require('process');


const logger = require('./components/logger');
const config = require('./configuration/appConfig.json');


const productRouter  = require('./components/routers/products');
const loginRouter  = require('./components/routers/login');


const { logRequest, corsOptions } = require('./components/middleware/trafficAuth');


const app = express();


// app.use(cors());

app.use((req, res, next) => {
  logRequest(req, res, next);

});

app.use(cors(corsOptions));
app.use(express.json());
app.use('/images', express.static('/imgs'));


app.use("/products", productRouter);
app.use("/login", loginRouter);


// app.post('/upload', upload.array('image'), async (req, res) => {
//   uploadProduct(req,res);
// });

// app.get('/getProducts', (req, res) => {
//   manageProductRequest(req, res);
// });


// app.post('/getLogin', (req, res) => {
//     getLogin(req, res);
// })


app.listen(config.serverPort, () => {
  logger.info(`server is running on port > ${config.serverPort}`);
  mongoose.connect('mongodb://' + config.dbHost + ':' + config.port + '/' + config.dbName)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Database connection error: ${error.message}`);
    exit(1)
  });
})

