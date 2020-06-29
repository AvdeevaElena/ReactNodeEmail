const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/contact',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
};