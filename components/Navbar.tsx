
import React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
    setCurrentPage: (page: Page) => void;
    userName: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage, userName }) => {
    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <span 
                            onClick={() => setCurrentPage('home')}
                            className="text-3xl font-extrabold cursor-pointer"
                            style={{background: 'linear-gradient(45deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}
                        >
                            StorySpark
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => setCurrentPage(link.page as Page)}
                                    className="text-gray-600 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-lg font-bold transition-colors duration-300"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                       {userName && (
                           <div className="bg-indigo-100 text-indigo-800 text-lg font-bold px-4 py-2 rounded-full">
                               {userName.charAt(0)}
                           </div>
                       )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
