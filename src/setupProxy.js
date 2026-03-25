const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../public/config.json');

console.log('Proxying API requests to:', config);
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8082',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',   // removes /api prefix
      },
    })
  );

  // allow your custom hostname to bypass invalid host header
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
};
