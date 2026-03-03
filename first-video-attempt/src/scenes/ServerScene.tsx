import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { ServerWindow } from '../components/webapp/ServerWindow';
import { TUI } from '../components/webapp/TUI';

const SERVER_ROTATION_DURATION = 40;

export const ServerScene: React.FC = () => {
  const frame = useCurrentFrame();

  const serverRotationY = interpolate(
    frame,
    [0, SERVER_ROTATION_DURATION],
    [90, 0], // Turn from 90 (side view) to 0 (front view)
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `perspective(1000px) scale(1) rotateY(${serverRotationY}deg)`,
          opacity: 1,
        }}
      >
        <ServerWindow>
          <TUI />
        </ServerWindow>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
