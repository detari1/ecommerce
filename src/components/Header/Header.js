import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
    return (
        <header className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-10">
                <Link to="/Home" className="text-white hover:underline">
                    <h1 className="text-2xl font-extrabold text-white">Ecommerce</h1>
                </Link>
                <Link to="/Login" className="text-white hover:underline">
                    <h1 className="font-extrabold text-white">Login</h1>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/Cart" className="relative">
                    <img src="https://cdn0.iconfinder.com/data/icons/user-interface-mono-set/512/user-interface-shoping-cart-trolly-market-purchase-128.png" alt="Cart" className="w-10 h-10" />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}

export default Header;