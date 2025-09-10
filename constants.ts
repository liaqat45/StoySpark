
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'animals', name: 'Animals', illustration: '🐾', color: 'bg-orange-300', prompt: 'a friendly lion in the jungle' },
  { id: 'space', name: 'Space', illustration: '🚀', color: 'bg-indigo-300', prompt: 'a smiling astronaut floating in space with colorful planets' },
  { id: 'colors', name: 'Colors', illustration: '🎨', color: 'bg-pink-300', prompt: 'a beautiful rainbow over a field of flowers' },
  { id: 'science', name: 'Science', illustration: '🔬', color: 'bg-teal-300', prompt: 'a child scientist looking through a microscope in a lab' },
  { id: 'adventure', name: 'Adventure', illustration: '🗺️', color: 'bg-lime-300', prompt: 'a treasure map on an old scroll on a tropical island' },
];

export const NAV_LINKS = [
    { name: 'Home', page: 'home' },
    { name: 'Stories', page: 'stories' },
    { name: 'Progress', page: 'progress' }
] as const;
