import React from 'react';

interface WebappContainerProps {
  children: React.ReactNode;
}

export const WebappContainer: React.FC<WebappContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-row w-full h-full bg-white">
      {children}
    </div>
  );
};
