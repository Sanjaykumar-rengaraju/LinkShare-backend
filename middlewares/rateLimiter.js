const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 60000,
  max: process.env.RATE_LIMIT_MAX || 10,
  message: 'Too many requests, please try again later.'
});

module.exports = limiter;