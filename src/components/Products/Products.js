import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Product({ cart, addToCart }) {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`/ecommerce/api/products/${id}.json`)
            .then((res) => res.json())
            .then((res) => setProduct(res));
    }, [id]);

    const isProductInCart = cart && cart.some(cartItem => cartItem.id === product.id);

    return (
        <div className="mx-auto p-4 flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-300">
            <div className="flex flex-col md:flex-row border p-4 rounded-lg bg-white/40 shadow-lg max-w-6xl">
                <div className="md:w-1/3 md:mr-4 flex justify-center items-center">
                    <img src={`/ecommerce/images/${product.imageUrl}`} alt={product.name} className="w-full h-auto object-cover mb-4 rounded-md" />
                </div>
                <div className="md:w-2/3 md:pl-4 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-2 text-center md:text-left">{product.name}</h2>
                    <p className="text-center md:text-left">{product.description}</p>
                    <p className="text-gray-900 font-bold text-center md:text-left">${product.price}</p>
                    <button
                        className={`mt-4 px-4 py-2 rounded-lg ${isProductInCart ? 'bg-gray-500 ' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        onClick={() => !isProductInCart && addToCart(product)}
                        disabled={isProductInCart}  >
                        {isProductInCart ? 'Already in Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}