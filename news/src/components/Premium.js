import React, { useState, useEffect } from 'react';

const Premium = () => {
    const [showSignup, setShowSignup] = useState(true); // Toggle between signup and login
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plans, setPlans] = useState([]);

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => console.log("Razorpay SDK loaded");
        script.onerror = () => console.error("Razorpay SDK failed to load");
        document.body.appendChild(script);
    }, []);

    // Handle signup request
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('Sending signup request...');
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            console.log('Response received:', response);
            const data = await response.json();
            if (data.message === 'Signup successful') {
                alert('Signup successful!');
                setShowSignup(false); // Switch to login form
            } else {
                alert('Signup error: ' + data.message);
            }
        } catch (error) {
            console.error('Error during signup request:', error);
        }
    };

    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();
        alert('Login successful!');
        fetchPlans(); // Fetch plans after login
    };

    // Fetch available plans
    const fetchPlans = () => {
        setPlans([
            { name: 'Basic Plan', description: 'Access to basic features', amount: 199 },
            { name: 'Standard Plan', description: 'Access to more features', amount: 499 },
            { name: 'Premium Plan', description: 'Access to all features', amount: 999 },
            { name: 'Gold Plan', description: 'VIP features', amount: 1999 },
            { name: 'Platinum Plan', description: 'Exclusive features', amount: 2999 },
        ]);
    };

    // Handle payment with Razorpay
    const handlePayment = (amount) => {
        if (window.Razorpay) {
            const options = {
                key: "rzp_test_LgeTONMHbSUmnn", // Replace with your actual test/live key
                amount: amount * 100, // Amount in paise
                currency: "INR",
                name: "Your College Name",
                description: "Subscription payment",
                handler: (response) => {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: username,
                    email: email,
                },
                theme: {
                    color: "#007bff",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            console.error("Razorpay SDK not loaded.");
        }
    };

    return (
        <div className="premium-container">
            <h2>{showSignup ? 'Sign Up' : 'Login'}</h2>

            {/* Signup Form */}
            {showSignup && (
                <form onSubmit={handleSignup} className="auth-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    <button type="button" onClick={() => setShowSignup(false)}>
                        Already have an account? Login
                    </button>
                </form>
            )}

            {/* Login Form */}
            {!showSignup && (
                <form onSubmit={handleLogin} className="auth-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => setShowSignup(true)}>
                        Don't have an account? Sign Up
                    </button>
                </form>
            )}

            {/* Display Plans after login */}
            {plans.length > 0 && (
                <div className="plans-container">
                    <h2>Available Plans</h2>
                    <div className="card-container">
                        {plans.map((plan, index) => (
                            <div key={index} className="card">
                                <h3>{plan.name}</h3>
                                <p>{plan.description}</p>
                                <button onClick={() => handlePayment(plan.amount)}>Subscribe</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Premium;
