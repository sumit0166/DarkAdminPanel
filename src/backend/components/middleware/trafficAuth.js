const logger = require("../logger");
const config = require("../../configuration/appConfig.json")

const incomingTraffic = config.corsPolicy.incomingTraffic;
const allowedOrigins = config.corsPolicy.allowedOrigins;

const corsOptions = {
    origin: (origin, callback) => {
        switch (incomingTraffic) {
            case "allowedOnly":
                if (typeof origin === 'undefined') {
                    callback("Origin not provided in request", false); // Reject the request directly
                } else if (allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback("Not allowed by CORS", false);
                }
                break;
            case "all":
                callback(null, true);
                break;
            default:
                callback("wrong POLICY - Restricting all trafffic ", false);
                break;
        }
        //   if (incomingTraffic === "allowedOnly" && typeof origin === 'undefined') {
        //     callback("Origin not provided in request", false); // Reject the request directly
        //   } else if (incomingTraffic === "allowedOnly" && allowedOrigins.includes(origin)) {
        //     callback(null, true);
        //   } else if (incomingTraffic === "all"){
        //     callback(null, true);
        //   }else {
        //     callback("Not allowed by CORS", false);
        //   }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};



function logRequest(req, res, next) {
    const origin = req.get('Origin');
    logger.info(`Request:, {
        ${origin},
        method: ${req.method},
        url: ${req.url}, 
      }`);
    next();
    // if (incomingTraffic === "allowedOnly" && allowedOrigins.includes(origin)) {
    //     next();
    //   } else {
    //     logger.info(`response sent -> Forbidden`);
    //     return res.status(403).send('Forbidden');
    //   }

}

module.exports = {
    logRequest,
    corsOptions
}