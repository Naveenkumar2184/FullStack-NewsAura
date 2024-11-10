import React, { useState, useEffect } from 'react';

const Travel = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const apiKey = 'a96d9eb6b93f46bc9313947bebf9bd05';
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=travel&apiKey=${apiKey}`;

    useEffect(() => {
        const fetchNews = async (url) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.status === 'ok') {
                    setNews(data.articles);
                    setFilteredNews(data.articles);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch news:', data.message);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };
        fetchNews(apiUrl);
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`;
        try {
            setLoading(true);
            const response = await fetch(searchUrl);
            const data = await response.json();
            if (data.status === 'ok') {
                setNews(data.articles);
                handleDateFilter();
            } else {
                console.error('Error fetching searched news:', data.message);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
        setLoading(false);
    };

    const handleDateFilter = () => {
        let filtered = news;
        if (searchQuery) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (startDate && endDate) {
            filtered = filtered.filter(article => {
                const articleDate = new Date(article.publishedAt);
                return articleDate >= new Date(startDate) && articleDate <= new Date(endDate);
            });
        }
        setFilteredNews(filtered);
    };

    useEffect(() => {
        handleDateFilter();
    }, [searchQuery, startDate, endDate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-container">
            <h1>Travel News</h1>

            {/* Search Input */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for travel news..."
                    className="search-input"
                />
            </div>

            <div>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-input"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-input"
                    placeholder="End Date"
                />
            </div>

            <div className="news-cards">
                {filteredNews.map((article, index) => (
                    <div key={index} className="news-card">
                        <img src={article.urlToImage || 'https://via.placeholder.com/300x180.png?text=No+Image'} alt={article.title} className="news-image" />
                        <div className="news-content">
                            <h3>{article.title}</h3>
                            <p>{article.description || 'No description available.'}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Travel;
