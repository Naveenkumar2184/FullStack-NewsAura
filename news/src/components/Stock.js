import React, { useState, useEffect } from 'react';
import './Stock.css';

const API_KEY = 'csl5hgpr01qq49fgn1r0csl5hgpr01qq49fgn1rg'; // Your API key
const STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'NFLX', 'NVDA', 'INTC', 'AMD'];

const fetchStockData = async (symbol) => {
    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
        const data = await response.json();

        // Check if the response contains the expected data
        if (!data.o || !data.h || !data.l || !data.c) {
            console.error('Invalid data for symbol', symbol, data);
            return null; // Return null if data is invalid
        }

        return { symbol, ...data }; // Return symbol along with data
    } catch (error) {
        console.error('Error fetching stock data for symbol:', symbol, error);
        return null; // Return null if an error occurs during fetch
    }
};

const createStockCard = (symbol, open, high, low, current) => {
    if (!open || !high || !low || !current) {
        return null; // Don't create the card if the required data is missing
    }

    return (
        <div className="stock-card" key={symbol}>
            <h3>{symbol}</h3>
            <p>Open: ${open.toFixed(2)}</p>
            <p>High: ${high.toFixed(2)}</p>
            <p>Low: ${low.toFixed(2)}</p>
            <p>Current: ${current.toFixed(2)}</p>
        </div>
    );
};

const Stock = () => {
    const [stockData, setStockData] = useState([]);

    const displayStocks = async () => {
        const fetchedStockData = [];

        // Fetch data for each stock and create cards
        for (const symbol of STOCKS) {
            const data = await fetchStockData(symbol);

            if (data) {
                fetchedStockData.push(data);
            }
        }

        setStockData(fetchedStockData);
    };

    useEffect(() => {
        displayStocks(); // Initialize the display of stocks on component mount
    }, []);

    return (
        <div>
            <h1>Stock Market Overview</h1>
            <div id="stock-container" className="stock-container">
                {stockData.map(({ symbol, o, h, l, c }) =>
                    createStockCard(symbol, o, h, l, c)
                )}
            </div>
        </div>
    );
};

export default Stock;
