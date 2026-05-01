const rateLimit = require('express-rate-limit');
const { rateLimit: rateLimitConfig } = require('../config');

const apiRateLimiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.max,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiRateLimiter };
