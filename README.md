# Jamaica Traffic Ticket Dashboard

A modern, full-stack web application for looking up and managing traffic tickets in Jamaica. Built with Next.js 16, React 19, and the official Jamaica Traffic Ticket Lookup API.

![Dashboard Preview](https://img.shields.io/badge/Status-Demo-blue)

## Features

- **OCR License Scanning**: Automatically extract information from Jamaica driver's license photos using AI
  - Multiple OCR engines: Tesseract.js, Transformers.js, and Claude Vision
  - Camera capture or file upload
  - Two-sided scanning (front and back of license)
  - Real-time quality feedback
  - Auto-fill form with extracted data
- **License Validation**: Verify driver's license information against the official database
- **Interactive Dashboard**: Visualize ticket statistics with charts and graphs
- **Ticket Management**: View outstanding and paid tickets with detailed information
- **Analytics**: Track violations by type, status, and timeline
- **Modern UI**: Clean, responsive design with Tailwind CSS v4
- **Dark Mode**: Full support for light and dark themes with system preference detection

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Animations**: Motion (Framer Motion)
- **Language**: TypeScript
- **OCR Engines**:
  - Tesseract.js v6 - Free, browser-based OCR
  - Transformers.js - AI models running in the browser
  - Claude Vision (Anthropic) - AI API for highest accuracy
- **AI SDK**: Vercel AI SDK with Anthropic provider

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd traffic
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. (Optional) Configure Claude Vision OCR:
```bash
# Edit .env.local and add your Anthropic API key
ANTHROPIC_API_KEY=your_api_key_here
```
Get your API key from [Anthropic Console](https://console.anthropic.com/settings/keys)

5. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── api/                    # API routes
│   ├── validate-license/   # License validation endpoint
│   ├── search-tickets/     # Ticket search endpoint
│   └── demo/               # Demo data endpoint
├── components/             # Reusable UI components
├── dashboard/              # Dashboard page
├── lookup/                 # License lookup page
├── types/                  # TypeScript type definitions
├── layout.tsx              # Root layout
└── page.tsx                # Landing page
```

## Pages

### Landing Page (`/`)
- Hero section with app introduction
- Feature highlights
- Call-to-action buttons
- Responsive design with gradient backgrounds

### License Lookup (`/lookup`)
- Driver's license validation form
- Client-side validation
- Error handling and feedback
- Privacy notice

### Dashboard (`/dashboard`)
- Overview statistics cards
- Ticket filtering (All, Outstanding, Paid)
- Detailed ticket table
- Expandable ticket details
- Demo mode available

## API Routes

### POST `/api/validate-license`
Validates driver's license information against the Jamaica government API.

**Request Body:**
```json
{
  "driversLicNo": "123456789",
  "controlNo": "1234567890",
  "origLicIssueDate": "2020-01-01",
  "dateOfBirth": "1990-01-01"
}
```

### POST `/api/search-tickets`
Searches for traffic tickets associated with validated license.

### GET `/api/demo/search-tickets`
Returns demo ticket data for testing without API calls.

## Features in Detail

### Theme Support
- Automatic dark mode detection
- Manual theme toggle
- Persistent theme preference
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

### Type Safety
- Full TypeScript coverage
- Type-safe API calls
- Validated form inputs

## Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Deployment

This application is configured for deployment on Netlify (see `netlify.toml`).

### Environment Variables
- `NEXT_PUBLIC_BASE_URL`: Your deployed application URL

## Security & Privacy

- No personal information is stored
- API calls are proxied through Next.js API routes
- Input sanitization and validation
- CORS handling at API level

## Disclaimer

This application uses the official Jamaica Traffic Ticket Lookup API. Always refer to official government sources for authoritative information. Use responsibly and in compliance with terms of service.
