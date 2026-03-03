import React from 'react';
import { AbsoluteFill, Easing, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserWindow } from '../components/BrowserWindow';
import { WebappContainer } from '../components/webapp/WebappContainer';
import { ChatbotPanel } from '../components/webapp/ChatbotPanel';
import { TripTimelinePanel } from '../components/webapp/TripTimelinePanel';
import { MouseCursor } from '../components/MouseCursor';
import { mockChatMessages, mockTripStops } from '../data/mockData';

// Timing constants local to this scene
const BROWSER_ENTRY_START = 0;
const CHAT_START = 30;
const CHAT_STAGGER = 10;
const TIMELINE_START = 60;
const TIMELINE_STAGGER = 15;
const CURSOR_MOVE_START = 135;
const CURSOR_MOVE_DURATION = 45;
const SCROLL_START = 180;
const SCROLL_DURATION = 60;
const BUTTON_APPEAR_START = 240;
const MOUSE_MOVE_TO_BUTTON_START = 260;
const MOUSE_MOVE_DURATION = 25;
const CLICK_START = 285;
const CLICK_DURATION = 15;
const BROWSER_ROTATION_START = 315;
const BROWSER_ROTATION_DURATION = 40;

export const BrowserScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser window scale animation
  const browserScale = spring({
    frame: frame - BROWSER_ENTRY_START,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.5 },
  });

  const browserOpacity = interpolate(
    frame,
    [BROWSER_ENTRY_START, BROWSER_ENTRY_START + 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Chat logic
  const visibleMessages = mockChatMessages.filter((_, index) => {
    const messageStartFrame = CHAT_START + index * CHAT_STAGGER;
    return frame >= messageStartFrame;
  });

  const messagesWithOpacity = visibleMessages.map((msg, index) => {
    const messageStartFrame = CHAT_START + index * CHAT_STAGGER;
    const opacity = interpolate(
      frame,
      [messageStartFrame, messageStartFrame + 8],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );
    return { ...msg, opacity };
  });

  // Timeline logic
  const visibleStops = mockTripStops.filter((_, index) => {
    const stopStartFrame = TIMELINE_START + index * TIMELINE_STAGGER;
    return frame >= stopStartFrame;
  });

  const stopsWithAnimation = visibleStops.map((stop, index) => {
    const stopStartFrame = TIMELINE_START + index * TIMELINE_STAGGER;
    const scale = spring({
      frame: frame - stopStartFrame,
      fps,
      config: { damping: 12, stiffness: 180, mass: 0.8 },
    });
    return { ...stop, scale };
  });

  // Cursor logic
  const cursorX = interpolate(
    frame,
    [0, CURSOR_MOVE_START, CURSOR_MOVE_START + CURSOR_MOVE_DURATION, MOUSE_MOVE_TO_BUTTON_START, MOUSE_MOVE_TO_BUTTON_START + MOUSE_MOVE_DURATION],
    [1050, 1050, 800, 800, 480],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.42, 0, 0.58, 1) }
  );

  const cursorY = interpolate(
    frame,
    [0, CURSOR_MOVE_START, CURSOR_MOVE_START + CURSOR_MOVE_DURATION, MOUSE_MOVE_TO_BUTTON_START, MOUSE_MOVE_TO_BUTTON_START + MOUSE_MOVE_DURATION],
    [150, 150, 360, 360, 540],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.42, 0, 0.58, 1) }
  );

  const buttonScale = spring({
    frame: frame - BUTTON_APPEAR_START,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const clicking = frame >= CLICK_START && frame < CLICK_START + CLICK_DURATION;
  
  const clickSpring = spring({
    frame: frame - CLICK_START,
    fps,
    config: { damping: 100, stiffness: 300 },
    durationInFrames: CLICK_DURATION,
  });
  
  const buttonClickScale = interpolate(clickSpring, [0, 0.5, 1], [1, 0.9, 1], { extrapolateRight: 'clamp' });
  const buttonColor = interpolateColors(clickSpring, [0, 0.5, 1], ['#ff7b00', '#cc6200', '#ff7b00']);

  const scrollOffset = interpolate(
    frame,
    [SCROLL_START, SCROLL_START + SCROLL_DURATION],
    [0, -200],
    { extrapolateRight: 'clamp', 
      extrapolateLeft: 'clamp',
      easing: Easing.in(Easing.quad) 
    }
  );

  // Rotation logic
  const browserRotationY = interpolate(
    frame,
    [BROWSER_ROTATION_START, BROWSER_ROTATION_START + BROWSER_ROTATION_DURATION],
    [0, -90],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
  );

  const isRotating = frame >= BROWSER_ROTATION_START;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `perspective(1000px) scale(${browserScale})${isRotating ? ` rotateY(${browserRotationY}deg)` : ''}`,
          opacity: browserOpacity,
        }}
      >
        <BrowserWindow url="https://ai-trip-planner.com" theme="light">
          <WebappContainer>
            <div style={{ width: '40%' }}>
              <ChatbotPanel 
                messages={messagesWithOpacity} 
                buttonScale={buttonScale}
                buttonClickScale={buttonClickScale}
                buttonColor={buttonColor}
              />
            </div>
            <div style={{ width: '60%', overflow: 'hidden' }}>
              <TripTimelinePanel
                stops={stopsWithAnimation.map(stop => ({...stop}))}
                scrollOffset={scrollOffset}
              />
            </div>
          </WebappContainer>
        </BrowserWindow>
      </AbsoluteFill>

      {frame < BROWSER_ROTATION_START && (
        <MouseCursor
          x={cursorX}
          y={cursorY}
          visible={true}
          clicking={clicking}
        />
      )}
    </AbsoluteFill>
  );
};
