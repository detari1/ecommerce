import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    return (
        <div className="mx-auto p-8 flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-300">
            <div className="flex flex-col md:flex-row border p-8 rounded-lg bg-white/40 shadow-lg max-w-xl w-full">
                <form className="flex flex-col space-y-6 w-full">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Login</h2>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 text-lg">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 rounded-md border border-gray-300 text-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-lg">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 rounded-md border border-gray-300 text-lg"
                        />
                    </div>
                    <Link
                        to="/Home"
                        className={`bg-blue-500 text-white p-3 rounded-md text-center text-lg ${!isFormValid ? 'opacity-50 ' : 'hover:bg-blue-600'}`}
                        onClick={(e) => !isFormValid && e.preventDefault()}
                    >
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;