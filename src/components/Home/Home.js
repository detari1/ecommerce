import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        fetch('/ecommerce/api/products.json')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched products:', data);
                setProducts(data);
            });
    }, []);

    useEffect(() => {
        fetch('/ecommerce/api/categories.json')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched categories:', data);
                setCategories(data);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.categoryId === parseInt(selectedCategory))
        : products;

    const productsPerPage = 5;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={`mx-auto p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-gray-900'}`}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl text-center mb-8">Our Products</h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-md border border-gray-300"   >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div className="mb-8">
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                    className={`p-2 rounded-md border ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`} >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className={`rounded-lg shadow-lg overflow-hidden border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-indigo-50 border-gray-300'} hover:shadow-2xl`}  >
                        <Link to={`/product/${product.id}`} state={{ product }}>
                            <div className="relative w-full h-72">
                                <img
                                    src={`/ecommerce/images/${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4" />
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="font-semibold text-lg">{product.name}</h2>
                                <span className="text-lg font-bold">${product.price}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}   >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
