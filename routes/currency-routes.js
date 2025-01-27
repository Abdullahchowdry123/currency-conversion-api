const express = require('express');
const { body, query, validationResult } = require('express-validator');
const router = express.Router();
const currencyService = require('../services/currencyService');
const config = require('../config');

// Validation middleware
const validateCurrencyParams = [
  query('from')
    .isString()
    .isLength({ min: 3, max: 3 })
    .isIn(config.supportedCurrencies)
    .withMessage('Invalid source currency'),
  query('to')
    .isString()
    .isLength({ min: 3, max: 3 })
    .isIn(config.supportedCurrencies)
    .withMessage('Invalid target currency'),
  query('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number')
];

// Convert currency endpoint
router.get('/convert', validateCurrencyParams, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { from, to, amount } = req.query;
    const result = await currencyService.convertCurrency(from, to, parseFloat(amount));
    
    res.json({
      success: true,
      data: {
        from,
        to,
        amount: parseFloat(amount),
        rate: result.rate,
        result: result.convertedAmount,
        timestamp: result.timestamp
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get latest rates endpoint
router.get('/rates', [
  query('base')
    .isString()
    .isLength({ min: 3, max: 3 })
    .isIn(config.supportedCurrencies)
    .withMessage('Invalid base currency')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { base } = req.query;
    const rates = await currencyService.getLatestRates(base);
    
    res.json({
      success: true,
      data: {
        base,
        rates,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;