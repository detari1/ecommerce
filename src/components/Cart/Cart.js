import React, { useState } from 'react';

function Cart({ cart, removeFromCart }) {
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    const handleCheckout = () => {

        cart.length = 0;
        setIsPaymentSuccessful(true);
    };

    return (
        <div className="mx-auto p-6 bg-gradient-to-r from-purple-300 to-blue-300 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-700 text-lg">No products in cart</p>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {cart.map((product, index) => (
                        <div key={index} className="bg-white/40 rounded-md shadow-md overflow-hidden border border-gray-300 flex flex-col md:flex-row">
                            <div className="md:w-1/3 flex justify-center items-center p-4">
                                <img
                                    src={`/ecommerce/images/${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-auto h-36 object-cover object-center"
                                />
                            </div>
                            <div className="md:w-3/4 p-4 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                    <p className="text-gray-900 font-bold">${product.price}</p>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700"
                                        onClick={() => removeFromCart(index)}    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="mt-8 p-4 bg-white rounded-md shadow-md border border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</h2>
                    <p className="text-gray-600 text-sm mt-2">Estimated Delivery Time: 3-5 months</p>
                    <button
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 mt-4"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            )}

            {isPaymentSuccessful && (
                <div className="mt-8 p-4 bg-white rounded-md shadow-md border border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-900">Payment Successful</h2>
                </div>
            )}
        </div>
    );
}

export default Cart;