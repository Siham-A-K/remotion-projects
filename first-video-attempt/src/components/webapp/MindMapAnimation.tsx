import React from 'react';
import { interpolate, useCurrentFrame, Easing, Img, staticFile } from 'remotion';
import { evolvePath, getLength, getPointAtLength } from '@remotion/paths';

// Timing constants
const MINDMAP_START = 171; // Local frame in ServerScene (global frame 525)
const BRANCH_DRAW_DURATION = 20;
const MAPPY_FADE_DURATION = 10;
const SEQUENCE_GAP = 5;

// Flowing dashes constants
const DASH_PATTERN_LENGTH = 12; // 8px dash + 4px gap
const FLOW_SPEED = 0.5; // pixels per frame for flowing effect

// Branch paths - cubic Bezier curves from AgentWindow center to endpoints
const PATHS = {
  top: 'M 294,360 C 450,310, 800,230, 960,200',
  middle: 'M 294,360 C 500,360, 700,360, 960,360',
  bottom: 'M 294,360 C 450,410, 800,490, 960,520',
};

interface BranchProps {
  path: string;
  startFrame: number;
}

const AnimatedBranch: React.FC<BranchProps> = ({ path, startFrame }) => {
  const frame = useCurrentFrame();

  // Don't render if before start frame
  if (frame < startFrame) {
    return null;
  }

  // Determine which phase we're in
  const drawEndFrame = startFrame + BRANCH_DRAW_DURATION;
  const isDrawing = frame < drawEndFrame;

  let strokeDasharray: string;
  let strokeDashoffset: number;

  if (isDrawing) {
    // Phase 1: Drawing - use evolvePath for progressive reveal
    const lineProgress = interpolate(
      frame,
      [startFrame, drawEndFrame],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      }
    );

    const evolved = evolvePath(lineProgress, path);
    strokeDasharray = evolved.strokeDasharray;
    strokeDashoffset = evolved.strokeDashoffset;
  } else {
    // Phase 2: Flowing - animate dash offset for marching ants effect
    strokeDasharray = '8 4';
    const framesAfterDrawn = frame - drawEndFrame;
    const flowOffset = framesAfterDrawn * FLOW_SPEED;
    strokeDashoffset = -(flowOffset % DASH_PATTERN_LENGTH);
  }

  return (
    <path
      d={path}
      stroke="#f97316"
      strokeWidth={3}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      fill="none"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))',
      }}
    />
  );
};

interface MappyIconProps {
  path: string;
  startFrame: number;
}

const AnimatedMappyIcon: React.FC<MappyIconProps> = ({ path, startFrame }) => {
  const frame = useCurrentFrame();

  // Calculate position at end of path
  const pathLength = getLength(path);
  const endPoint = getPointAtLength(path, pathLength);

  // Fade in and scale animation
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + MAPPY_FADE_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const scale = interpolate(
    frame,
    [startFrame, startFrame + MAPPY_FADE_DURATION],
    [0.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  // Don't render if before start frame
  if (frame < startFrame) {
    return null;
  }

  return (
    <g
      transform={`translate(${endPoint.x}, ${endPoint.y})`}
      style={{ opacity }}
    >
      <circle
        cx={0}
        cy={0}
        r={60}
        fill="#1f2937"
        stroke="#f97316"
        strokeWidth={2}
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))',
        }}
      />
      <g transform={`scale(${scale})`}>
        <foreignObject x={-48} y={-48} width={96} height={96}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Img src={staticFile('mappy/Mappy.svg')} style={{ width: '80px' }} />
          </div>
        </foreignObject>
      </g>
    </g>
  );
};

export const MindMapAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  // Calculate timing for each branch
  const topBranchStart = MINDMAP_START;
  const topMappyStart = topBranchStart + BRANCH_DRAW_DURATION;

  const middleBranchStart = topMappyStart + MAPPY_FADE_DURATION + SEQUENCE_GAP;
  const middleMappyStart = middleBranchStart + BRANCH_DRAW_DURATION;

  const bottomBranchStart = middleMappyStart + MAPPY_FADE_DURATION + SEQUENCE_GAP;
  const bottomMappyStart = bottomBranchStart + BRANCH_DRAW_DURATION;

  // Don't render anything if before animation starts
  if (frame < MINDMAP_START) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 1280 720"
      style={{
        position: 'absolute',
        top: 0,
        left: 580,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {/* Top branch */}
      <AnimatedBranch path={PATHS.top} startFrame={topBranchStart} />
      <AnimatedMappyIcon path={PATHS.top} startFrame={topMappyStart} />

      {/* Middle branch */}
      <AnimatedBranch path={PATHS.middle} startFrame={middleBranchStart} />
      <AnimatedMappyIcon path={PATHS.middle} startFrame={middleMappyStart} />

      {/* Bottom branch */}
      <AnimatedBranch path={PATHS.bottom} startFrame={bottomBranchStart} />
      <AnimatedMappyIcon path={PATHS.bottom} startFrame={bottomMappyStart} />
    </svg>
  );
};
