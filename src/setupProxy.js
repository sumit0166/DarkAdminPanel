const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend:8082',
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
