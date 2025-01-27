require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  exchangeApiKey: process.env.EXCHANGE_API_KEY,
  exchangeApiUrl: process.env.EXCHANGE_API_URL || 'https://api.exchangerate-api.com/v4/latest',
  cacheTimeout: 5 * 60 * 1000, // 5 minutes in milliseconds
  supportedCurrencies: [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'NZD'
  ]
};