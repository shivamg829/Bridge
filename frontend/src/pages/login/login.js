import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginuser } from '../../api/auth';

function LogIn() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginuser(user);
            if (response.success) {
                alert(response.message);
                // Typically store token, redirect - but no add
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container">
            <div className="container-back-img"></div>
            <div className="container-back-color"></div>
            <div className="card">
                <div className="card_title">
                    <h1>Login Here</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div className="card_terms">
                    <span>
                        Don't have an account yet?
                        <Link to="/signup">Sign Up Here</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
