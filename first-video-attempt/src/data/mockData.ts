import { ChatMessage, TripStop } from '../types/trip';

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    message: 'Plan a day trip in Paris for me',
    timestamp: Date.now(),
  },
  {
    id: '2',
    sender: 'bot',
    message: "I'd love to help! Here's a perfect day in Paris tailored just for you...",
    timestamp: Date.now() + 1000,
  },
  {
    id: '3',
    sender: 'bot',
    message: 'I\'ve created an itinerary starting with the iconic Eiffel Tower, followed by world-class art at the Louvre, and ending with a charming walk through Montmartre.',
    timestamp: Date.now() + 2000,
  },
];

export const mockTripStops: TripStop[] = [
  {
    id: 'stop1',
    icon: '🗼',
    title: 'Eiffel Tower',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop',
    description: 'Start your day at Paris\'s most iconic landmark',
    time: '9:00 AM',
    color: '#3B82F6',
  },
  {
    id: 'stop2',
    icon: '🎨',
    title: 'Louvre Museum',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    description: 'Explore world-famous art and history',
    time: '11:00 AM',
    color: '#8B5CF6',
  },
  {
    id: 'stop3',
    icon: '🍽️',
    title: 'Lunch at Le Marais',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    description: 'Enjoy authentic French cuisine',
    time: '1:30 PM',
    color: '#EC4899',
  },
  {
    id: 'stop4',
    icon: '⛪',
    title: 'Notre-Dame Cathedral',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    description: 'Marvel at Gothic architecture',
    time: '3:00 PM',
    color: '#F59E0B',
  },
  {
    id: 'stop5',
    icon: '🎭',
    title: 'Montmartre',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    description: 'End your day in this artistic neighborhood',
    time: '5:00 PM',
    color: '#10B981',
  },
];
