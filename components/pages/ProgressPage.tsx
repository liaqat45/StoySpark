
import React from 'react';
import { UserProgress } from '../../types';

interface ProgressPageProps {
    progress: UserProgress;
    onReset: () => void;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-8 h-8 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const ProgressPage: React.FC<ProgressPageProps> = ({ progress, onReset }) => {
    const totalQuizzes = progress.quizResults.length;
    const totalCorrect = progress.quizResults.reduce((sum, r) => sum + r.score, 0);
    const totalQuestions = progress.quizResults.reduce((sum, r) => sum + r.total, 0);
    const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800">Your Progress, {progress.name}!</h1>
                <p className="mt-2 text-lg text-gray-600">Look how much you've learned!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Overall Stats */}
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-4">Overall Score</h2>
                    <div className="relative w-32 h-32 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path className="text-gray-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-green-500" strokeWidth="3" fill="none" strokeDasharray={`${overallPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-green-600">
                           {overallPercentage}%
                        </div>
                    </div>
                     <p className="mt-4 text-gray-600">{totalCorrect} / {totalQuestions} correct answers</p>
                </div>
                
                 {/* Stories Completed */}
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                     <h2 className="text-2xl font-bold text-pink-600 mb-4">Stories Completed</h2>
                     <div className="text-6xl font-extrabold text-pink-500">{progress.completedStories.length}</div>
                     <p className="mt-2 text-gray-600">great adventures so far</p>
                </div>

                 {/* Badges Earned */}
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                     <h2 className="text-2xl font-bold text-orange-600 mb-4">Badges Earned</h2>
                     <div className="flex justify-center space-x-2 text-5xl">
                         {progress.badges.length > 0 ? progress.badges.map(b => <span key={b}>{b}</span>) : <p className="text-lg text-gray-400 mt-4">No badges yet!</p>}
                     </div>
                </div>
            </div>

            <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz History</h2>
                <div className="space-y-4">
                    {progress.quizResults.length > 0 ? progress.quizResults.map(result => (
                         <div key={result.timestamp} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                             <div>
                                <p className="font-bold text-lg text-gray-700">{result.storyCategory} Story Quiz</p>
                                <p className="text-sm text-gray-500">{new Date(result.timestamp).toLocaleDateString()}</p>
                             </div>
                             <div className="flex items-center">
                                {[...Array(result.total)].map((_, i) => (
                                    <StarIcon key={i} filled={i < result.score} />
                                ))}
                             </div>
                         </div>
                    )) : <p className="text-gray-500 text-center">No quizzes attempted yet. Let's go learn!</p>}
                </div>
            </div>
             <div className="mt-8 text-center">
                 <button onClick={onReset} className="text-sm text-gray-500 hover:text-red-500 underline">Reset Progress</button>
             </div>
        </div>
    );
};

export default ProgressPage;
