import React from 'react';

interface BrowserWindowProps {
  children: React.ReactNode;
  url?: string;
  theme?: 'light' | 'dark';
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  children,
  url = 'https://ai-trip-planner.com',
  theme = 'light'
}) => {
  const chromeClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const addressBarClass = theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700';

  return (
    <div
      className="mx-auto my-10 rounded-lg shadow-2xl overflow-hidden"
      style={{ width: '1100px', height: '620px' }}
    >
      {/* Browser Chrome */}
      <div className={`${chromeClass} px-4 py-3 flex items-center gap-4`}>
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Address Bar */}
        <div className={`flex-1 ${addressBarClass} rounded-md px-4 py-1.5 text-sm flex items-center gap-2`}>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="flex-1">{url}</span>
        </div>

        {/* Menu Icon */}
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>

      {/* Browser Content */}
      <div className="bg-white" style={{ height: 'calc(100% - 48px)' }}>
        {children}
      </div>
    </div>
  );
};
