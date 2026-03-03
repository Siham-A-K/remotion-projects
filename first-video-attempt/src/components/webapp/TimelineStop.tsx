import React from 'react';

interface TimelineStopProps {
  icon: string;
  color?: string;
  order: number;
}

export const TimelineStop: React.FC<TimelineStopProps> = ({
  icon,
  color = '#3B82F6',
  order
}) => {
  return (
    <div
      className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white border-3 text-xl"
      style={{
        borderColor: color,
        borderWidth: '3px',
        left: '-20px',
        top: `${order * 156}px`,
      }}
    >
      {icon}
    </div>
  );
};
