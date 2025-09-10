
import React from 'react';
import { Page } from '../../types';

interface HomePageProps {
    setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                            AI Storytelling for <span className="text-indigo-500">Every Child</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-600">
                            Inclusive stories with sign language, pictures, and quizzes to spark imagination and learning.
                        </p>
                        <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                            <button 
                                onClick={() => setCurrentPage('stories')}
                                className="px-8 py-4 bg-indigo-500 text-white font-bold text-lg rounded-xl hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Explore Stories
                            </button>
                            <button 
                                onClick={() => setCurrentPage('progress')}
                                className="px-8 py-4 bg-pink-500 text-white font-bold text-lg rounded-xl hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Start Learning
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                        <img src="https://picsum.photos/seed/kid-reading/600/500" alt="Child reading a book" className="rounded-2xl shadow-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
