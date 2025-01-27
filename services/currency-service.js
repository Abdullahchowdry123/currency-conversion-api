const axios = require('axios');
const config = require('../config');

// Simple in-memory cache
const ratesCache = new Map();

class CurrencyService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: config.exchangeApiUrl,
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${config.exchangeApiKey}`
      }
    });
  }

  async getLatestRates(base) {
    const cacheKey = `rates_${base}`;
    const cachedData = ratesCache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < config.cacheTimeout) {
      return cachedData.rates;
    }

    try {
      const response = await this.apiClient.get(`/${base}`);
      const rates = response.data.rates;

      // Update cache
      ratesCache.set(cacheKey, {
        rates,
        timestamp: Date.now()
      });

      return rates;
    } catch (error) {
      throw new Error(`Failed to fetch exchange rates: ${error.message}`);
    }
  }

  async convertCurrency(from, to, amount) {
    try {
      const rates = await this.getLatestRates(from);
      
      if (!rates[to]) {
        throw new Error(`Exchange rate not available for ${to}`);
      }

      const rate = rates[to];
      const convertedAmount = amount * rate;

      return {
        rate,
        convertedAmount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Currency conversion failed: ${error.message}`);
    }
  }
}

module.exports = new CurrencyService();