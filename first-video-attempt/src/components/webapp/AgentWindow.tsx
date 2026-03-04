import React from 'react';
import { interpolate, useCurrentFrame, Easing, Img, staticFile } from 'remotion';

const ANIMATION_START = 131; // Local frame in ServerScene (global frame 485)
const HEIGHT_EXPAND_DURATION = 10;

export const AgentWindow: React.FC = () => {
  const frame = useCurrentFrame();

  // Opacity animation - fade in when appearing
  const opacity = interpolate(
    frame,
    [ANIMATION_START - 5, ANIMATION_START],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Height animation - start short, then expand to full height
  const height = interpolate(
    frame,
    [ANIMATION_START, ANIMATION_START + HEIGHT_EXPAND_DURATION],
    [50, 572], // 572px = 620px (server height) - 48px (header)
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  if (frame < ANIMATION_START) {
    return null;
  }

  return (
    <div
      className="absolute right-24 top-0 bg-gray-900 border-2 border-orange-500 rounded-lg z-10 flex items-center justify-center"
      style={{
        width: '40%',
        height: `${height}px`,
        opacity,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(249, 115, 22, 0.3)',
      }}
    >
      <Img src={staticFile('mappy/Mappy.svg')} className="w-48" />
    </div>
  );
};
