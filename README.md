# Deribit Price Chart

A real-time price chart for the BTC-PERPETUAL instrument on Deribit, built with React and Lightweight Charts.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [File Structure](#file-structure)

## Features

- Real-time updates of mark price and last price.
- Interactive chart using Lightweight Charts.
- Responsive design that adapts to different screen sizes.

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Lightweight Charts**: A library for creating interactive financial charts.
- **TypeScript**: A superset of JavaScript that adds static types.
- **WebSocket**: For real-time communication with the Deribit API.

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:

### `git clone https://github.com/GiacomoSorbiWork/BTC-price-tracker.git`

2. **Navigate to the project directory**:

### `cd deribit-price-chart`

3. **Install dependencies**:

### `npm install`

4. **Setup environment variables**:

### `DERIBIT_WS_URL=wss://test.deribit.com/ws/api/v2`

5. **Run the application**:

### `npm start`

Your application will be running on http://localhost:3000

## Usage

Once the application is running, you will see a chart displaying the current mark price and last price for the BTC-PERPETUAL instrument. The chart updates in real-time as new data is received from the Deribit WebSocket.

## File Structure

/deribit-price-chart
├── /public
│   └── index.html
├── /src
│   ├── /components
│   │   └── PriceChart.tsx
│   ├── /json-rpc
│   │   └── DeribitSocket.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── App.css
├── .env
├── package.json
└── README.md


