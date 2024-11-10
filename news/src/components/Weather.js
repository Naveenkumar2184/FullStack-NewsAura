import React, { useState, useEffect } from 'react';

// Weather component
const Weather = () => {
    const [districts] = useState([
        'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode',
        'Tirunelveli', 'Thanjavur', 'Vellore', 'Tiruppur', 'Kanyakumari', 'Karur',
        'Namakkal', 'Dindigul', 'Krishnagiri', 'Nilgiris', 'Pudukkottai', 'Thiruvarur',
        'Theni', 'Virudhunagar'
    ]);

    const [weatherData, setWeatherData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const apiKey = '900248a67e3844be87960906242409'; // Replace with your actual API key

    // Mapping of districts to images
    const districtImages = {
        'Chennai': 'https://i.pinimg.com/1200x/2c/cd/0e/2ccd0ea78d1c1b96e3d44dcbeb2be770.jpg',
        'Coimbatore': 'https://s3.ap-south-1.amazonaws.com/kukufm/channel_icons/505c8d456d8f47cba5d385a5ad99b9fb.png',
        'Madurai': 'https://yt3.googleusercontent.com/0EFnoFboj5TxHF-G5laeBlNln-Q38X78L9xD34a0UYaG_zqtwwfnQOePJ-6HdTApgVfidjiv=s900-c-k-c0x00ffffff-no-rj',
        'Tiruchirappalli': 'https://i.pinimg.com/736x/ee/71/6f/ee716f73ac396ba9c7f9d1a985a6ce13.jpg',
        'Salem': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPddMOAiXY6lJmmkEqEbI2eB-Navw2bJaxQ&s',
        'Erode': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Periyar_statue_in_erode.JPG',
        'Tirunelveli': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Tirunelveli.jpg',
        'Thanjavur': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Brihadishwara_Temple%2C_Thanjavur%2C_India.jpg',
        'Vellore': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Vellore_fort_main_entrance.jpg',
        'Tiruppur': 'https://i.imgur.com/6s7xF1b.jpg',
        'Kanyakumari': 'https://upload.wikimedia.org/wikipedia/commons/5/58/Vivekananda_Rock_Memorial.jpg',
        'Karur': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Karur_temple.jpg',
        'Namakkal': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Namakkal_Anjaneya_temple.jpg',
        'Dindigul': 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Dindigul_Fort_entrance.JPG',
        'Krishnagiri': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Krishnagiri_dam.JPG',
        'Nilgiris': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Ooty_lake.jpg',
        'Pudukkottai': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Pudukkottai_Rock_cut_temple.jpg',
        'Thiruvarur': 'https://upload.wikimedia.org/wikipedia/commons/8/89/Thiruvarur_Temple_Car.jpg',
        'Theni': 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Meghamalai_mountains.jpg',
        'Virudhunagar': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Virudhunagar_railway_station.jpg'
    };


    // Fetch weather data for a district
    const fetchWeatherData = async (district) => {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${district}&aqi=no`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return {
                name: data.location.name,
                description: data.current.condition.text,
                temperature: data.current.temp_c,
                humidity: data.current.humidity,
                icon: data.current.condition.icon,
                image: districtImages[district] || 'https://via.placeholder.com/200?text=No+Image',
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return {
                name: district,
                description: 'Data not available',
                temperature: 'N/A',
                humidity: 'N/A',
                icon: 'https://via.placeholder.com/50?text=No+Image',
                image: 'https://via.placeholder.com/200?text=No+Image',
            };
        }
    };

    // Display weather data
    const displayWeatherData = (data) => {
        return (
            <div className="card" key={data.name}>
                <div className="card-inner">
                    <div className="card-front">
                        <img src={data.image} alt={data.name} />
                        <h2>{data.name}</h2>
                    </div>
                    <div className="card-back">
                        <h2>{data.name}</h2>
                        <p>Description: {data.description}</p>
                        <p>Temperature: {data.temperature} °C</p>
                        <p>Humidity: {data.humidity}%</p>
                    </div>
                </div>
            </div>
        );
    };

    // Get weather for all districts
    const getWeatherForAllDistricts = async () => {
        const weatherPromises = districts.map(fetchWeatherData);
        const weatherDataArray = await Promise.all(weatherPromises);
        setWeatherData(weatherDataArray);
    };

    // Search functionality
    const handleSearch = async () => {
        if (districts.includes(searchQuery)) {
            const weatherData = await fetchWeatherData(searchQuery);
            setWeatherData([weatherData]); // Set only the searched district's weather data
        } else {
            alert('Please enter a valid district name from Tamil Nadu.');
        }
    };

    // Fetch weather data when component mounts
    useEffect(() => {
        getWeatherForAllDistricts();
    }, []);

    return (
        <div className="container">
            <h1>Tamil Nadu Weather</h1>

            {/* Search functionality */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    placeholder="Enter district name..."
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="cards-container">
                {weatherData.map(displayWeatherData)}
            </div>
        </div>
    );
};

export default Weather;
