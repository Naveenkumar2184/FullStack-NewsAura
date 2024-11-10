import React, { useState, useEffect } from 'react';

const Technology = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNews, setFilteredNews] = useState([]);

    const apiKey = 'a96d9eb6b93f46bc9313947bebf9bd05'; // News API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=20&apiKey=${apiKey}`;

    // Fetch news articles on initial load
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
                    console.error('Error fetching news:', data.message);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews(apiUrl); // Initial fetch
    }, []);

    // Handle search query change
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter news articles based on search query
    useEffect(() => {
        const filtered = news.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNews(filtered);
    }, [searchQuery, news]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-container">
            <h1>Sports News</h1>

            {/* Search Input */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for sports news..."
                    className="search-input"
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

export default Technology;
