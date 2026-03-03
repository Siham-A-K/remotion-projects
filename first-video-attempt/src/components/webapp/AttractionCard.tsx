import React from 'react';
import { Img } from 'remotion';

interface AttractionCardProps {
  image: string;
  title: string;
  description?: string;
  time?: string;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({
  image,
  title,
  description,
  time
}) => {
  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ml-16 mb-6">
      {/* Image */}
      <div className="w-32 h-32 flex-shrink-0">
        <Img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {time && (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded ml-2">
              {time}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
};
