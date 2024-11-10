import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    useEffect(() => {
        // Toggle sub-menu display when logo_name is clicked
        const arrowElements = document.querySelectorAll(".logo_name");
        arrowElements.forEach((arrow) => {
            arrow.addEventListener("click", (e) => {
                const arrowParent = e.target.closest('.nav-links'); // Get the parent of the menu item
                arrowParent.classList.toggle("showMenu");
            });
        });

        // Toggle sidebar close/open when bx-menu is clicked
        const sidebar = document.querySelector(".sidebar");
        const sidebarBtn = document.querySelector(".bx-menu");
        sidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("close");
        });

        // Clean up event listeners on unmount
        return () => {
            arrowElements.forEach((arrow) => {
                arrow.removeEventListener("click", () => { });
            });
            sidebarBtn.removeEventListener("click", () => { });
        };
    }, []);

    return (
        <div className="sidebar close">
            <div className="logo-details">
                <i className="bx bx-news"></i>
                <span className="logo_name">NewsAura</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/breaking">
                        <i className="bx bx-news"></i>
                        <span className="link_name">Breaking News</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/breaking">Breaking News</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="#">
                        <i className="bx bx-news"></i>
                        <span className="link_name">Categories</span>
                    </Link>
                    <ul className="sub-menu">
                        <li><Link to="/sports">Sports</Link></li>
                        <li><Link to="/politics">Politics</Link></li>
                        <li><Link to="/technology">Technology</Link></li>
                        <li><Link to="/health">Health</Link></li>
                        <li><Link to="/business">Business</Link></li>
                        <li><Link to="/science">Science</Link></li>
                        <li><Link to="/entertainment">Entertainment</Link></li>
                        <li><Link to="/religion">Religion</Link></li>
                        <li><Link to="/education">Education</Link></li>
                        <li><Link to="/travel">Travel</Link></li>
                        <li><Link to="/environment">Environment</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/weather">
                        <i className="bx bx-cloud"></i>
                        <span className="link_name">Weather</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/weather">Weather</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/stock">
                        <i className="bx bx-line-chart"></i>
                        <span className="link_name">Stock Market</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/stock">Stock Market</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/Premium">
                        <i className="bx bx-star"></i>
                        <span className="link_name">Premium Content</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/Premium">Premium Content</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="http://127.0.0.1:5000">
                        <i className="bx bx-chat"></i>
                        <span className="link_name">AI Chatbot</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><a className="link_name" href="http://127.0.0.1:5000">AI Chatbot</a></li>
                    </ul>
                </li>
                <li>
                    <Link to="/settings">
                        <i className="bx bx-cog"></i>
                        <span className="link_name">Settings</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/settings">Settings</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="hamburger">
                        <i className="bx bx-menu"></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
