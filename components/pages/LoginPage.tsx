
import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (name: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name.trim());
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 m-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">Welcome to StorySpark!</h1>
                    <p className="text-gray-600 mt-2">What should we call you?</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">Your First Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="e.g., Alex"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-4 text-lg font-bold text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transform hover:scale-105 transition-all duration-300"
                    >
                        Let's Go!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
