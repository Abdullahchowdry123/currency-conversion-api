# Currency Conversion API

currency conversion API that integrates with an external exchange rate service to provide real-time currency conversion capabilities.

# Features

- Real-time currency conversion
- Support for multiple currencies
- Error handling and validation
- Rate limiting
- Logging
- Input validation

# Prerequisites

- Node.js (Version 20 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
EXCHANGE_API_KEY=your_api_key_here
EXCHANGE_API_URL=https://api.exchangerate-api.com/v4/latest
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### GET /api/v1/convert
Convert an amount from one currency to another.

Query Parameters:
- `from` (required): Source currency code (e.g., USD)
- `to` (required): Target currency code (e.g., EUR)
- `amount` (required): Amount to convert (numeric)

Example Request:
```
GET /api/v1/convert?from=USD&to=EUR&amount=100
```

Example Response:
```json
{
  "success": true,
  "data": {
    "from": "USD",
    "to": "EUR",
    "amount": 100,
    "rate": 0.85,
    "result": 85,
    "timestamp": "2025-01-27T12:00:00Z"
  }
}
```

### GET /api/v1/rates
Get latest exchange rates for a base currency.

Query Parameters:
- `base` (required): Base currency code (e.g., USD)

Example Request:
```
GET /api/v1/rates?base=USD
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (invalid input)
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Testing

Run the test suite:
```bash
npm test
```

## Note

Copy all the files i created into the following structure:

currency-conversion-api/
├── .env
├── package.json
├── README.md
├── server.js
├── config.js
├── middleware/
│   └── errorHandler.js
├── routes/
│   └── currencyRoutes.js
└── services/
    └── currencyService.js

1. All currency codes follow the ISO 4217 standard
2. Rate limiting is set to 100 requests per hour per IP
3. Exchange rates are cached for 5 minutes to prevent excessive API calls

## Author

Abdullah Chowdry
