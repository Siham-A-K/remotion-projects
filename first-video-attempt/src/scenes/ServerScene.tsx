import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { ServerWindow } from '../components/webapp/ServerWindow';
import { TUI } from '../components/webapp/TUI';
import { AgentWindow } from '../components/webapp/AgentWindow';
import { MindMapAnimation } from '../components/webapp/MindMapAnimation';

const SERVER_ROTATION_DURATION = 40;
const MOVE_LEFT_START = 151; // Local frame (global frame 505)
const MOVE_LEFT_DURATION = 20;

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

  // Move ServerWindow to the left at frame 151, showing only half
  const translateX = interpolate(
    frame,
    [MOVE_LEFT_START, MOVE_LEFT_START + MOVE_LEFT_DURATION],
    [0, -580], // Move left by half the ServerWindow width (1100px / 2)
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
          transform: `perspective(1000px) scale(1) rotateY(${serverRotationY}deg) translateX(${translateX}px)`,
          opacity: 1,
        }}
      >
        <ServerWindow>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <TUI />
            <MindMapAnimation />
            <AgentWindow />
          </div>
        </ServerWindow>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
