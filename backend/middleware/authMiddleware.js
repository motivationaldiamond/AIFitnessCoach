//authMiddleware.js

const authMiddleware = (req, res, next) => {
    // Add authentication logic here
    next();
  };
  
  module.exports = authMiddleware;
  