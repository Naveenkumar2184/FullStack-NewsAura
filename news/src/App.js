import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BreakingNews from './components/BreakingNews';
import Weather from './components/Weather';
import Stock from './components/Stock'; // Changed from StockMarket to Stock
import Premium from './components/Premium'; // Changed from PremiumContent to Premium
import Sports from './components/Sports';
import Politics from './components/Politics';
import Technology from './components/Technology';
import Health from './components/Health';
import Settings from './components/Settings';

import Business from './components/Business';
import Science from './components/Science';
import Entertainment from './components/Entertainment';
import Religion from './components/Religion';
import Education from './components/Education';
import Travel from './components/Travel';
import Environment from './components/Environment';
import './components/BreakingNews.css';
import './components/Weather.css';
import './components/Premium.css';


function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/breaking" element={<BreakingNews />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/stock" element={<Stock />} /> {/* Changed to Stock */}
                    <Route path="/premium" element={<Premium />} /> {/* Changed to Premium */}
                    <Route path="/sports" element={<Sports />} />
                    <Route path="/politics" element={<Politics />} />
                    <Route path="/technology" element={<Technology />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/science" element={<Science />} />
                    <Route path="/entertainment" element={<Entertainment />} />
                    <Route path="/religion" element={<Religion />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/travel" element={<Travel />} />

                    <Route path="/environment" element={<Environment />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
