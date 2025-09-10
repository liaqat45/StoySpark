
import React from 'react';
import { Category } from '../../types';
import { CATEGORIES } from '../../constants';

interface StoryExplorerPageProps {
    onSelectCategory: (category: Category) => void;
}

const CategoryCard: React.FC<{ category: Category; onSelect: () => void; }> = ({ category, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className={`p-6 rounded-2xl ${category.color} flex flex-col items-center justify-center text-center text-white font-bold cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300`}
        >
            <div className="text-6xl mb-4">{category.illustration}</div>
            <h3 className="text-2xl">{category.name}</h3>
        </div>
    );
};

const StoryExplorerPage: React.FC<StoryExplorerPageProps> = ({ onSelectCategory }) => {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800">Choose a Story Category</h1>
                <p className="mt-2 text-lg text-gray-600">What adventure do you want to go on today?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {CATEGORIES.map(cat => (
                    <CategoryCard key={cat.id} category={cat} onSelect={() => onSelectCategory(cat)} />
                ))}
            </div>
        </div>
    );
};

export default StoryExplorerPage;
