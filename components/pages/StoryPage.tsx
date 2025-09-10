
import React, { useState, useEffect } from 'react';
import { Category, Story } from '../../types';
import { geminiService } from '../../services/geminiService';
import Spinner from '../Spinner';

interface StoryPageProps {
    category: Category;
    onStoryReady: (story: Story, quiz: any[]) => void; // Simplified quiz type for now
    onStartQuiz: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ category, onStoryReady, onStartQuiz }) => {
    const [story, setStory] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [quiz, setQuiz] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generateContent = async () => {
            try {
                setError(null);
                setLoading(true);

                const storyText = await geminiService.generateStory(category);
                setStory(storyText);

                const imagePromises = [
                    geminiService.generateImage(`A child-friendly cartoon image for a story about ${category.name}.`),
                    geminiService.generateImage(`Another cute illustration for a kids story about ${category.name}.`)
                ];
                const generatedImages = await Promise.all(imagePromises);
                setImages(generatedImages);

                const quizData = await geminiService.generateQuiz(storyText);
                setQuiz(quizData);

            } catch (err: any) {
                setError(err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        generateContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);
    
    useEffect(() => {
        if(story && images.length > 0 && quiz) {
            onStoryReady({category: category.name, text: story, images}, quiz);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [story, images, quiz]);

    if (loading) {
        return <Spinner message={`Creating a story about ${category.name}...`} />;
    }

    if (error) {
        return <div className="text-center text-red-500 font-bold p-8">{error}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">A Story About {category.name}</h1>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">The Story</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{story}</p>
                    </div>
                    <div className="space-y-6">
                        {images.map((img, index) => (
                            <img key={index} src={img} alt={`Illustration for the story ${index + 1}`} className="w-full h-auto object-cover rounded-xl shadow-md" />
                        ))}
                    </div>
                </div>

                <div className="mt-12 border-t pt-8">
                     <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Sign Language Animation</h2>
                     <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                         <p className="text-gray-500">Sign language video placeholder</p>
                     </div>
                </div>
                 <div className="mt-12 text-center">
                    <button 
                        onClick={onStartQuiz}
                        disabled={!quiz}
                        className="px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Take the Quiz!
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default StoryPage;
