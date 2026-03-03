export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp?: number;
}

export interface TripStop {
  id: string;
  icon: string;  // emoji or icon name
  title: string;
  image: string; // URL or path
  description?: string;
  time?: string; // e.g., "10:00 AM"
  color?: string; // for timeline marker
}

export interface TripData {
  messages: ChatMessage[];
  stops: TripStop[];
}
