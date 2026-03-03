import { AbsoluteFill, Easing, interpolate, interpolateColors, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from './components/Background';
import { BrowserWindow } from './components/BrowserWindow';
import { ServerWindow } from './components/webapp/ServerWindow';
import { WebappContainer } from './components/webapp/WebappContainer';
import { ChatbotPanel } from './components/webapp/ChatbotPanel';
import { TripTimelinePanel } from './components/webapp/TripTimelinePanel';
import { MouseCursor } from './components/MouseCursor';
import { mockChatMessages, mockTripStops } from './data/mockData';

// Animation timing constants
const BROWSER_ENTRY_START = 0;
const CHAT_START = 30;
const CHAT_STAGGER = 10;
const TIMELINE_START = 60; // After all chat messages are visible
const TIMELINE_STAGGER = 15;
const CURSOR_MOVE_START = 135; // After all timeline items appear (60 + 5*15 = 135)
const CURSOR_MOVE_DURATION = 45;
const SCROLL_START = 180; // After cursor reaches destination
const SCROLL_DURATION = 60;
const BUTTON_APPEAR_START = 240;
const MOUSE_MOVE_TO_BUTTON_START = 260;
const MOUSE_MOVE_DURATION = 25;
const CLICK_START = 285;
const CLICK_DURATION = 15;
const BROWSER_ROTATION_START = CLICK_START + CLICK_DURATION + 15; // 315
const BROWSER_ROTATION_DURATION = 40;
const BROWSER_SEQUENCE_DURATION = BROWSER_ROTATION_START + BROWSER_ROTATION_DURATION ; // 355
const SERVER_SEQUENCE_START = BROWSER_SEQUENCE_DURATION - 1; // 354
const SERVER_ROTATION_DURATION = 40;

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser window scale animation
  const browserScale = spring({
    frame: frame - BROWSER_ENTRY_START,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const browserOpacity = interpolate(
    frame,
    [BROWSER_ENTRY_START, BROWSER_ENTRY_START + 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Filter visible chat messages based on frame
  const visibleMessages = mockChatMessages.filter((_, index) => {
    const messageStartFrame = CHAT_START + index * CHAT_STAGGER;
    return frame >= messageStartFrame;
  });

  // Calculate opacity for each chat message
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

  // Filter visible timeline stops based on frame
  const visibleStops = mockTripStops.filter((_, index) => {
    const stopStartFrame = TIMELINE_START + index * TIMELINE_STAGGER;
    return frame >= stopStartFrame;
  });

  // Calculate scale for each timeline stop (bounce animation)
  const stopsWithAnimation = visibleStops.map((stop, index) => {
    const stopStartFrame = TIMELINE_START + index * TIMELINE_STAGGER;
    const scale = spring({
      frame: frame - stopStartFrame,
      fps,
      config: {
        damping: 12, // Lower damping = more bounce
        stiffness: 180,
        mass: 0.8,
      },
    });
    return { ...stop, scale };
  });

  // Cursor animation
  const cursorVisible = frame < BROWSER_ROTATION_START;

  // Move cursor in steps
  const cursorX = interpolate(
    frame,
    [
      0, 
      CURSOR_MOVE_START, 
      CURSOR_MOVE_START + CURSOR_MOVE_DURATION, 
      MOUSE_MOVE_TO_BUTTON_START, 
      MOUSE_MOVE_TO_BUTTON_START + MOUSE_MOVE_DURATION
    ],
    [1050, 1050, 800, 800, 480],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    }
  );

  const cursorY = interpolate(
    frame,
    [
      0, 
      CURSOR_MOVE_START, 
      CURSOR_MOVE_START + CURSOR_MOVE_DURATION, 
      MOUSE_MOVE_TO_BUTTON_START, 
      MOUSE_MOVE_TO_BUTTON_START + MOUSE_MOVE_DURATION
    ],
    [150, 150, 360, 360, 540],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    }
  );

  // Button Appearance Animation
  const buttonScale = spring({
    frame: frame - BUTTON_APPEAR_START,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });

  // Click Animation
  const clicking = frame >= CLICK_START && frame < CLICK_START + CLICK_DURATION;
  
  const clickSpring = spring({
    frame: frame - CLICK_START,
    fps,
    config: {
      damping: 100,
      stiffness: 300,
    },
    durationInFrames: CLICK_DURATION,
  });
  
  const buttonClickScale = interpolate(
    clickSpring,
    [0, 0.5, 1],
    [1, 0.9, 1],
    { 
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  const buttonColor = interpolateColors(
    clickSpring,
    [0, 0.5, 1],
    ['#ff7b00', '#cc6200', '#ff7b00']
  );

  // Scroll animation for timeline panel
  const scrollOffset = interpolate(
    frame,
    [SCROLL_START, SCROLL_START + SCROLL_DURATION],
    [0, -200],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.in(Easing.quad),
    }
  );

  // Rotation animations
  const browserRotationY = interpolate(
    frame,
    [BROWSER_ROTATION_START, BROWSER_ROTATION_START + BROWSER_ROTATION_DURATION],
    [0, -90],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    }
  );

  const serverRotationY = interpolate(
    frame,
    [SERVER_SEQUENCE_START, SERVER_SEQUENCE_START + SERVER_ROTATION_DURATION],
    [90, 0], // Turn from 90 (side view) to 0 (front view)
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const isBrowserRotating = frame > BROWSER_ROTATION_START;

  return (
    <AbsoluteFill>
      <Background gradient={true} />

      <Sequence from={SERVER_SEQUENCE_START}>
        <AbsoluteFill
          style={{
            transform: `perspective(1000px) scale(${browserScale}) rotateY(${serverRotationY}deg)`,
            opacity: browserOpacity,
          }}
        >
          <ServerWindow>
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              
            </div>
          </ServerWindow>
        </AbsoluteFill>
      </Sequence>

      <Sequence durationInFrames={BROWSER_SEQUENCE_DURATION}>
        <AbsoluteFill
          style={{
            transform: `perspective(1000px) scale(${browserScale})${isBrowserRotating ? `rotateY(${browserRotationY}deg)` : ''}`,
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
      </Sequence>

      

      {cursorVisible && (
        <MouseCursor
          x={cursorX}
          y={cursorY}
          visible={cursorVisible}
          clicking={clicking}
        />
      )}
    </AbsoluteFill>
  );
};
