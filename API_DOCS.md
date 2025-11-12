# API Documentation

## Jamaica Traffic Ticket Lookup API - Reverse Engineered

This document details the API endpoints discovered through reverse engineering the official Jamaica Traffic Ticket Lookup system.

---

## Base URL
```
https://trafficticketlookup.gov.jm/api
```

## Authentication
- No authentication required for public endpoints
- CORS restrictions apply (requests must come from whitelisted origins)
- Rate limiting is in place (IP-based)

---

## Endpoints

### 1. Validate Driver's License

**Endpoint:** `POST /driver-licences/is-valid`

**Description:** Validates driver's license information against the database.

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
Origin: https://trafficticketlookup.gov.jm
Referer: https://trafficticketlookup.gov.jm/
```

**Request Body:**
```json
{
  "driversLicNo": "string",      // Driver's licence number (9 digits)
  "controlNo": "string",          // Control number (10 digits)
  "origLicIssueDate": "string",   // Format: YYYY-MM-DD
  "dateOfBirth": "string",        // Format: YYYY-MM-DD
  "ipAddress": "string"           // Client IP address
}
```

**Response:**
```json
true  // License is valid
```
or
```json
false // License is invalid
```

**Status Codes:**
- `200 OK` - Request successful
- `400 Bad Request` - Invalid request body
- `403 Forbidden` - CORS violation or rate limit exceeded
- `405 Method Not Allowed` - Wrong HTTP method
- `500 Internal Server Error` - Server error

**Example Request:**
```bash
curl -X POST https://trafficticketlookup.gov.jm/api/driver-licences/is-valid \
  -H "Content-Type: application/json" \
  -H "Origin: https://trafficticketlookup.gov.jm" \
  -d '{
    "driversLicNo": "123456789",
    "controlNo": "1234567890",
    "origLicIssueDate": "2020-01-01",
    "dateOfBirth": "1990-01-01",
    "ipAddress": "192.168.1.1"
  }'
```

---

### 2. Search Traffic Tickets

**Endpoint:** `POST /traffic-tickets/search`

**Description:** Searches for traffic tickets associated with validated driver's license.

**Note:** This endpoint likely requires a valid session after successful license validation.

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
Origin: https://trafficticketlookup.gov.jm
Referer: https://trafficticketlookup.gov.jm/
```

**Request Body:** (Structure inferred, not confirmed)
```json
{
  "driversLicNo": "string",
  "controlNo": "string",
  "dateOfBirth": "string"
}
```

**Expected Response:** (Structure inferred from UI)
```json
{
  "tickets": [
    {
      "id": "string",
      "ticketNumber": "string",
      "violation": "string",
      "violationDate": "string",
      "location": "string",
      "fineAmount": number,
      "status": "Outstanding" | "Paid",
      "dueDate": "string",
      "officerName": "string",
      "officerBadge": "string",
      "paidDate": "string",
      "paymentMethod": "string"
    }
  ],
  "totalTickets": number,
  "outstanding": number,
  "totalOutstanding": number
}
```

**Status Codes:**
- `200 OK` - Request successful
- `403 Forbidden` - CORS violation or unauthorized
- `405 Method Not Allowed` - Wrong HTTP method

---

### 3. Get Specific Ticket

**Endpoint:** `GET /traffic-tickets/{id}`

**Description:** Retrieves details for a specific ticket (inferred, not confirmed).

**Status:** Unconfirmed - endpoint exists but behavior not tested

---

## Security & Rate Limiting

### CORS Policy
The API enforces strict CORS policies:
- Only accepts requests from `https://trafficticketlookup.gov.jm`
- External requests will receive `403 Forbidden`

### Rate Limiting
- IP-based rate limiting is active
- The system calls `https://ipv4.icanhazip.com/` to verify client IP
- Excessive requests may result in temporary blocks

### Headers
All responses include:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; frame-src 'self' data:; ...
```

---

## Error Responses

### Standard Error Format
```json
{
  "type": "https://www.jhipster.tech/problem/problem-with-message",
  "title": "Method Not Allowed",
  "status": 405,
  "detail": "Request method 'GET' not supported",
  "path": "/api/traffic-tickets",
  "message": "error.http.405"
}
```

### Common Errors

**403 Forbidden**
```
Access denied
```

**405 Method Not Allowed**
```json
{
  "title": "Method Not Allowed",
  "status": 405,
  "detail": "Request method 'GET' not supported"
}
```

---

## Framework Details

- **Backend:** JHipster (Spring Boot + Angular)
- **Version:** 1.1.0 (from UI footer)
- **Database:** Unknown (likely PostgreSQL or MySQL)

---

## Proxy Server Implementation

Due to CORS restrictions, a proxy server is required:

```javascript
app.post('/api/validate-license', async (req, res) => {
  const response = await axios.post(
    'https://trafficticketlookup.gov.jm/api/driver-licences/is-valid',
    req.body,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://trafficticketlookup.gov.jm',
        'Referer': 'https://trafficticketlookup.gov.jm/'
      }
    }
  );
  res.json(response.data);
});
```

---

## Testing

### Using cURL
```bash
# Test validation endpoint
curl -X POST http://localhost:3001/api/validate-license \
  -H "Content-Type: application/json" \
  -d '{
    "driversLicNo": "123456789",
    "controlNo": "1234567890",
    "origLicIssueDate": "2020-01-01",
    "dateOfBirth": "1990-01-01"
  }'
```

### Using JavaScript/Axios
```javascript
const response = await axios.post('http://localhost:3001/api/validate-license', {
  driversLicNo: '123456789',
  controlNo: '1234567890',
  origLicIssueDate: '2020-01-01',
  dateOfBirth: '1990-01-01'
});
```

---

## Notes

1. **Data Privacy:** Never log or store personal license information
2. **Testing:** Use the `/api/demo/search-tickets` endpoint for development
3. **Production:** Implement proper error handling and retry logic
4. **Compliance:** Ensure usage complies with Jamaica's data protection laws

---

## Changelog

- **2025-10-17:** Initial reverse engineering and documentation
- Discovered license validation endpoint
- Identified search endpoint structure
- Documented CORS and security requirements

---

## Disclaimer

This documentation is based on reverse engineering for educational purposes. Always refer to official API documentation when available. Use responsibly and in compliance with terms of service.
