import React, { useState, useEffect } from 'react';

const Religion = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    const apiKey = 'a96d9eb6b93f46bc9313947bebf9bd05';
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=religion&apiKey=${apiKey}`;

    useEffect(() => {
        const fetchNews = async (url) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.status === 'ok') {
                    setNews(data.articles);
                    setFilteredNews(data.articles);
                    setLoading(false);
                    setNoResults(false);
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

    useEffect(() => {
        let filtered = news;

        if (searchQuery) {
            filtered = filtered.filter((article) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredNews(filtered);

        if (filtered.length === 0 && searchQuery.trim() !== '') {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [searchQuery, news]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-container">
            <h1>Religion News</h1>

            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for religion news..."
                    className="search-input"
                />
            </div>

            <div className="news-cards">
                {noResults ? (
                    <div>No news found based on your search.</div>
                ) : (
                    filteredNews.map((article, index) => (
                        <div key={index} className="news-card">
                            <img
                                src={article.urlToImage || 'https://via.placeholder.com/300x180.png?text=No+Image'}
                                alt={article.title}
                                className="news-image"
                            />
                            <div className="news-content">
                                <h3>{article.title}</h3>
                                <p>{article.description || 'No description available.'}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Religion;
