
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import StoryExplorerPage from './components/pages/StoryExplorerPage';
import StoryPage from './components/pages/StoryPage';
import QuizPage from './components/pages/QuizPage';
import ProgressPage from './components/pages/ProgressPage';
import LoginPage from './components/pages/LoginPage';
import { Page, Category, Story, QuizQuestion, UserProgress } from './types';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [currentStory, setCurrentStory] = useState<Story | null>(null);
    const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[] | null>(null);
    
    const initialProgress: UserProgress = {
        name: 'Guest',
        completedStories: [],
        badges: [],
        quizResults: [],
    };

    useEffect(() => {
        const savedProgress = localStorage.getItem('userProgress');
        if (savedProgress) {
            setUserProgress(JSON.parse(savedProgress));
            setCurrentPage('home');
        } else {
            setCurrentPage('login');
        }
    }, []);

    const handleLogin = (name: string) => {
        const newProgress = { ...initialProgress, name };
        localStorage.setItem('userProgress', JSON.stringify(newProgress));
        setUserProgress(newProgress);
        setCurrentPage('home');
    };
    
    const handleLogout = () => {
        localStorage.removeItem('userProgress');
        setUserProgress(null);
        setCurrentPage('login');
    }

    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setCurrentPage('story');
    };
    
    const handleStoryReady = useCallback((story: Story, quiz: QuizQuestion[]) => {
        setCurrentStory(story);
        setCurrentQuiz(quiz);
    }, []);

    const handleStartQuiz = () => {
        if (currentQuiz) {
            setCurrentPage('quiz');
        }
    };
    
    const handleQuizComplete = (score: number, total: number) => {
        if(userProgress && currentStory) {
            const updatedProgress: UserProgress = { ...userProgress };
            
            // Add quiz result
            updatedProgress.quizResults.push({
                storyCategory: currentStory.category,
                score,
                total,
                timestamp: Date.now()
            });

            // Add completed story
            if(!updatedProgress.completedStories.includes(currentStory.category)) {
                updatedProgress.completedStories.push(currentStory.category);
            }

            // Add badges
            if(updatedProgress.completedStories.length === 1 && !updatedProgress.badges.includes('🌟')) {
                updatedProgress.badges.push('🌟'); // First Story Badge
            }
            if(updatedProgress.completedStories.length === CATEGORIES.length && !updatedProgress.badges.includes('🏆')) {
                updatedProgress.badges.push('🏆'); // Story Master Badge
            }
             if(score === total && !updatedProgress.badges.includes('🎯')) {
                updatedProgress.badges.push('🎯'); // Perfect Score Badge
            }

            setUserProgress(updatedProgress);
            localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
        }
        setCurrentPage('progress');
    };

    const renderPage = () => {
        if (!userProgress) {
            return <LoginPage onLogin={handleLogin} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'stories':
                return <StoryExplorerPage onSelectCategory={handleSelectCategory} />;
            case 'story':
                if (selectedCategory) {
                    return <StoryPage category={selectedCategory} onStoryReady={handleStoryReady} onStartQuiz={handleStartQuiz}/>;
                }
                // Fallback to stories if no category is selected
                setCurrentPage('stories');
                return null;
            case 'quiz':
                if (currentQuiz && currentStory) {
                    return <QuizPage quiz={currentQuiz} storyCategory={currentStory.category} onQuizComplete={handleQuizComplete} />;
                }
                 // Fallback
                setCurrentPage('stories');
                return null;
            case 'progress':
                return <ProgressPage progress={userProgress} onReset={handleLogout}/>;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {userProgress && <Navbar setCurrentPage={setCurrentPage} userName={userProgress.name}/>}
            <main className="flex-grow">
                {renderPage()}
            </main>
            {userProgress && <Footer />}
        </div>
    );
};

export default App;
