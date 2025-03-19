import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get('http://localhost:3000/');
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.log('Error occurred while fetching items:', error);
            }
        }
        fetch();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6 flex flex-col">
            {/* Header */}
            <header className="text-center text-4xl font-extrabold text-indigo-700 mb-6">
                FindIt – Lost & Found Portal
            </header>

            <div className="text-center mb-6">
                <p className="text-lg text-gray-700">Lost something? No worries! Browse the items below to find it.</p>
                <p className="text-lg text-gray-700">Found something? Help others by reporting it.</p>
            </div>

            {/* Button to Report a Found Item */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/uploads')}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
                >
                    📢 Report a Found Item
                </button>
            </div>

            {/* Items List - Using ONLY Flexbox */}
            <div className="flex flex-wrap justify-center items-center gap-6 flex-grow">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-80 flex flex-col items-center"
                    >
                        <img src={item.imageUrl} alt="Found item" className="w-full h-40 object-cover rounded-md" />
                        <p className="text-gray-600 mt-2 text-center">{item.description}</p>
                        <p className="text-sm text-gray-500">📍 Location: <span className="font-medium">{item.location}</span></p>
                        <p className="text-sm text-gray-500">👤 Uploaded by: <span className="font-medium">{item.name || "Anonymous"}</span></p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-600 mt-6 py-4 border-t">
                © 2025 FindIt – Connecting People, Finding Things. 🚀
            </footer>
        </div>
    );
};

export default Home;
