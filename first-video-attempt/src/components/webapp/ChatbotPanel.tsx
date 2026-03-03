import React from 'react';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '../../types/trip';

interface ChatbotPanelProps {
  messages: ChatMessageType[];
  buttonScale?: number;
  buttonClickScale?: number;
  buttonColor?: string;
}

export const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ 
  messages, 
  buttonScale = 0,
  buttonClickScale = 1,
  buttonColor = '#ff7b00'
}) => {
  return (
    <div className="relative w-md h-full flex flex-col border-r border-gray-200 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          AI Trip Planner
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your personal travel assistant</p>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            sender={msg.sender}
          />
        ))}

        {/* Book your Trip! Button */}
        {buttonScale > 0 && (
          <div 
            className="w-full"
            style={{ 
              transform: `scale(${buttonScale * buttonClickScale})`,
              transformOrigin: 'center center',
            }}
          >
            <button 
              className="w-full py-2 px-6 text-white rounded-xl text-lg font-bold shadow-lg transition-colors"
              style={{ backgroundColor: buttonColor }}
            >
              Book your Trip!
            </button>
          </div>
        )}
      </div>

      {/* Input Field (Visual Only) */}
      <div className="absolute inset-x-0 bottom-0 px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask me anything about your trip..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
