import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

const Uploads = () => {
    const naviagte=useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ Fixed capitalization

        const data = new FormData(); // ✅ Fixed "new formData()" to "new FormData()"
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('file', file); // ✅ Fixed: use 'file' instead of 'formData.file'

        try {
            const response = await axios.post('http://localhost:3000/uploads', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });;
            
            console.log(response.data);
            console.log(data);
            
            alert(response.data.message);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        }
        console.log("FormData content:");
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }

        naviagte('/')
        
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6">Report a Lost Item</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <label className="block mb-2 text-gray-700">Your Name</label>
                <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                <label className="block mb-2 text-gray-700">Description</label>
                <textarea
                    name="description"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                <label className="block mb-2 text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                <label className="block mb-2 text-gray-700">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Uploads;
