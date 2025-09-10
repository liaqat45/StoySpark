
import React, { useState } from 'react';
import { QuizQuestion } from '../../types';

interface QuizPageProps {
    quiz: QuizQuestion[];
    storyCategory: string;
    onQuizComplete: (score: number, total: number) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ quiz, storyCategory, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    const currentQuestion = quiz[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setShowFeedback(true);
        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            onQuizComplete(score, quiz.length);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">Quiz Time!</h1>
                <p className="mt-2 text-lg text-gray-600">Let's see what you remember from the {storyCategory} story.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="mb-4 text-center">
                    <p className="text-gray-500 font-semibold">Question {currentQuestionIndex + 1} of {quiz.length}</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">{currentQuestion.question}</h2>
                </div>
                <div className="mt-8 space-y-4">
                    {currentQuestion.options.map((option) => {
                        let buttonClass = "w-full text-left p-4 rounded-xl text-lg font-bold border-4 transition-all duration-200 ";
                        if (showFeedback) {
                            if (option === currentQuestion.correctAnswer) {
                                buttonClass += "bg-green-100 border-green-400 text-green-800";
                            } else if (option === selectedAnswer) {
                                buttonClass += "bg-red-100 border-red-400 text-red-800";
                            } else {
                                buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                            }
                        } else {
                             buttonClass += "bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100 hover:border-indigo-400";
                        }

                        return (
                            <button
                                key={option}
                                onClick={() => handleAnswer(option)}
                                disabled={showFeedback}
                                className={buttonClass}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {showFeedback && (
                    <div className="mt-6 text-center">
                        <p className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Great job! That\'s correct!' : 'Not quite. The right answer is highlighted.'}
                        </p>
                        <button 
                            onClick={handleNext}
                            className="mt-4 px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors">
                            {currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
