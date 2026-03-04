import React from 'react';

interface ServerWindowProps {
  children: React.ReactNode;
}

export const ServerWindow: React.FC<ServerWindowProps> = ({ children }) => {
  return (
    <div
      className="mx-auto my-10 rounded-lg shadow-2xl bg-gray-900 border border-gray-700"
      style={{ width: '1100px', height: '620px' }}
    >
      {/* Fake Header for Buttons only */}
      <div className="px-4 py-3 flex items-center">
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ height: 'calc(100% - 48px)' }}>
        {children}
      </div>
    </div>
  );
};
