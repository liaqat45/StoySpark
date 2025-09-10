
import { GoogleGenAI, Type } from "@google/genai";
import { Category, QuizQuestion } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const quizSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: 'The question text.'
            },
            options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'An array of 3-4 strings for the multiple choice options.'
            },
            correctAnswer: {
                type: Type.STRING,
                description: 'The exact string from the options array that is the correct answer.'
            }
        },
        required: ['question', 'options', 'correctAnswer']
    }
};

const mockDelay = <T,>(data: T, delay = 1000): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const geminiService = {
    generateStory: async (category: Category): Promise<string> => {
        if (!ai) {
            return mockDelay(`Once upon a time, in a land of ${category.name}, there lived a brave hero. This hero went on a grand adventure to find a magical treasure. Along the way, they met funny friends and overcame silly challenges. In the end, everyone celebrated with a big party. It was a day to remember for all the wonderful ${category.name} in the land. The sun set, painting the sky with beautiful colors, and our hero felt happy and proud.`);
        }
        try {
            const prompt = `Generate a very simple, positive, and short story (around 200 words) for a 6-year-old child about ${category.name}. Use simple sentences and vocabulary. The story should be cheerful and easy to illustrate.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return response.text;
        } catch (error) {
            console.error("Error generating story:", error);
            throw new Error("Failed to generate the story. Please try again.");
        }
    },

    generateQuiz: async (storyText: string): Promise<QuizQuestion[]> => {
        if (!ai) {
            const mockQuiz: QuizQuestion[] = [
                { question: 'Who is the main character?', options: ['A hero', 'A villain', 'A dragon'], correctAnswer: 'A hero' },
                { question: 'What did the hero look for?', options: ['A lost puppy', 'Magical treasure', 'A sandwich'], correctAnswer: 'Magical treasure' },
                { question: 'How did the story end?', options: ['With a big party', 'Sadly', 'With a nap'], correctAnswer: 'With a big party' }
            ];
            return mockDelay(mockQuiz);
        }
        try {
            const prompt = `Based on the following story, create a JSON array of 3 simple multiple-choice questions suitable for a 6-year-old. Each question must have exactly one correct answer and two incorrect but plausible options. Story: "${storyText}"`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: quizSchema,
                }
            });
            const parsed = JSON.parse(response.text);
            return parsed;
        } catch (error) {
            console.error("Error generating quiz:", error);
            throw new Error("Failed to generate the quiz. Please try again.");
        }
    },

    generateImage: async (prompt: string): Promise<string> => {
        if (!ai) {
             // Using picsum for mock image
            return mockDelay(`https://picsum.photos/seed/${Math.random()}/512/512`);
        }
        try {
            const fullPrompt = `Create a cute, simple, and colorful cartoon illustration for a child's storybook about: ${prompt}. The style should be friendly and simple, with no text and a solid light-colored background.`;
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: fullPrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                return `data:image/jpeg;base64,${base64ImageBytes}`;
            }
            throw new Error("No image was generated.");
        } catch (error) {
            console.error("Error generating image:", error);
            throw new Error("Failed to generate an image. Please try again.");
        }
    }
};
