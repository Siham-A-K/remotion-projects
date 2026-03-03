import React from 'react';

interface MouseCursorProps {
  x?: number;
  y?: number;
  visible?: boolean;
  clicking?: boolean;
}

export const MouseCursor: React.FC<MouseCursorProps> = ({
  x = 0,
  y = 0,
  visible = true,
  clicking = false
}) => {
  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        zIndex: 9999,
        transform: clicking ? 'scale(0.9)' : 'scale(1)',
      }}
    >
      {/* Cursor SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 3.5L18.5 12L11.5 14L8.5 20.5L5.5 3.5Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Click Ripple Effect */}
      {clicking && (
        <div
          className="absolute top-0 left-0 w-6 h-6 border-2 border-blue-500 rounded-full animate-ping"
          style={{ opacity: 0.6 }}
        />
      )}
    </div>
  );
};
