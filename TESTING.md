# Testing the Jamaica Traffic Ticket Dashboard

## Overview

The application now has proper API integration with the Jamaica Traffic Ticket Lookup API. Here's how the data flow works:

## Data Flow

1. **Landing Page** (`/`) → Displays demo mode by default
2. **Lookup Page** (`/lookup`) → Validates license and fetches tickets
3. **Dashboard** (`/dashboard`) → Shows real data if available, otherwise demo data

## How to Test API Integration

### Step 1: Start the Development Server

```bash
npm run dev
```

The app will run at http://localhost:3000

### Step 2: Check Console Logs

Open your browser's developer console (F12) to see detailed logging of all API calls.

### Step 3: Test License Validation Flow

1. Navigate to http://localhost:3000/lookup
2. Fill in the form with driver's license information:
   - Driver's License Number (9 digits)
   - Control Number (10 digits)
   - Original License Issue Date
   - Date of Birth
3. Click "Validate & Search"

### Step 4: Monitor the Console

You should see logs like this:

**Frontend (Browser Console):**
```
Validating license... {driversLicNo: "123456789", ...}
Validation response status: 200
License valid: true/false
Fetching tickets...
Tickets response status: 200
Ticket data received: {...}
```

**Backend (Terminal):**
```
[API] Validating license: 123456789
[API] Calling Jamaica API...
[API] Jamaica API response status: 200
[API] Validation result: true
[API] Searching tickets for license: 123456789
[API] Calling Jamaica ticket search API...
[API] Ticket search response status: 200
[API] Ticket data retrieved: {...}
```

### Step 5: Verify Data Source on Dashboard

When you reach the dashboard, look for the badge next to the heading:
- **"Live Data"** (green badge) = Real data from Jamaica API
- **"Demo Mode"** (amber badge) = Using demo data

## API Endpoints Being Called

### 1. License Validation
- **Endpoint**: `POST /api/validate-license`
- **Proxies to**: `https://trafficticketlookup.gov.jm/api/driver-licences/is-valid`
- **Purpose**: Validates driver's license credentials

### 2. Ticket Search
- **Endpoint**: `POST /api/search-tickets`
- **Proxies to**: `https://trafficticketlookup.gov.jm/api/traffic-tickets/search`
- **Purpose**: Retrieves traffic tickets for validated license

### 3. Demo Data (Fallback)
- **Endpoint**: `GET /api/demo/search-tickets`
- **Purpose**: Provides sample data when API calls fail or for testing

## Expected Behavior

### Success Flow
1. User submits valid license information
2. Frontend calls `/api/validate-license`
3. API validates against Jamaica government API
4. If valid, frontend calls `/api/search-tickets`
5. Real ticket data is stored in sessionStorage
6. User is redirected to dashboard with "Live Data" badge
7. Dashboard displays actual ticket information

### Failure Scenarios

#### Invalid License
- Error message shown: "Invalid driver's license information"
- User stays on lookup page

#### API Unavailable
- License validation fails
- Error message shown: "An error occurred while validating your license"
- Check console for detailed error

#### Ticket Search Fails (but license valid)
- User redirected to dashboard anyway
- Dashboard shows demo data (fallback)
- "Demo Mode" badge displayed

## Testing with Demo Data

To test the dashboard without API calls:
1. Go directly to http://localhost:3000/dashboard
2. Click "View Demo Dashboard" from landing page
3. Dashboard will show demo mode with sample tickets

## Debugging Tips

### Check sessionStorage
Open browser console and run:
```javascript
// Check if real ticket data exists
sessionStorage.getItem('ticketData')

// Clear session to test demo mode
sessionStorage.clear()
```

### Monitor Network Requests
1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Submit the lookup form
4. You should see:
   - `POST /api/validate-license`
   - `POST /api/search-tickets` (if validation succeeds)

### Common Issues

**CORS Errors**
- The API routes handle CORS by proxying requests
- If you see CORS errors, it means the proxy isn't working correctly

**403 Forbidden**
- Jamaica API might be blocking requests
- Check that Origin and Referer headers are set correctly in API routes

**Rate Limiting**
- The Jamaica API may have rate limits
- Try waiting a few minutes between requests

## Expected vs Demo Data

### Demo Data Contains
- 5 sample tickets
- Mix of Outstanding and Paid statuses
- Sample locations in Jamaica
- Fictional officer names and badge numbers

### Real Data Will Contain
- Actual traffic tickets for the validated license
- Real violation types, locations, and amounts
- Actual officer information
- Proper dates and payment status

## Summary

The application is now fully configured to:
1. ✅ Call the Jamaica Traffic Ticket Lookup API through proxy routes
2. ✅ Validate driver's license information
3. ✅ Fetch real ticket data
4. ✅ Store data in sessionStorage
5. ✅ Display real data on dashboard with "Live Data" badge
6. ✅ Fall back to demo data when API is unavailable
7. ✅ Provide comprehensive error handling and user feedback
8. ✅ Log all API calls for debugging

All console logs can be removed in production by simply removing the `console.log()` statements from the code.
