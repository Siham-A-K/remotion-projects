import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from './components/Background';
import { BrowserWindow } from './components/BrowserWindow';
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

  // Cursor animation - visible from start, positioned in top right
  const cursorVisible = true;

  // Cursor starts in top right corner, then moves to middle of trip panel
  const cursorX = interpolate(
    frame,
    [0, CURSOR_MOVE_START, CURSOR_MOVE_START + CURSOR_MOVE_DURATION],
    [1050, 1050, 800], // Top right -> stays -> middle of trip panel
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.42, 0, 0.58, 1), // ease-in-out
    }
  );

  const cursorY = interpolate(
    frame,
    [0, CURSOR_MOVE_START, CURSOR_MOVE_START + CURSOR_MOVE_DURATION],
    [150, 150, 360], // Top right -> stays -> middle
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.42, 0, 0.58, 1), // ease-in-out
    }
  );

  // Scroll animation for timeline panel (simulates scrolling down)
  const scrollOffset = interpolate(
    frame,
    [SCROLL_START, SCROLL_START + SCROLL_DURATION],
    [0, -100], // Scroll down 300px
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.in(Easing.quad), // ease-in
    }
  );

  return (
    <AbsoluteFill>
      {/* Layer 1: Background */}
      <Background gradient={true} />

      {/* Layer 2: Browser Window with Webapp */}
      <AbsoluteFill
        style={{
          transform: `scale(${browserScale})`,
          opacity: browserOpacity,
        }}
      >
        <BrowserWindow url="https://ai-trip-planner.com" theme="light">
          <WebappContainer>
            {/* Left Panel: Chatbot */}
            <div style={{ width: '40%' }}>
              <ChatbotPanel messages={messagesWithOpacity.map(msg => ({
                ...msg,
                // Apply opacity via inline style wrapper if needed
              }))} />
            </div>

            {/* Right Panel: Timeline */}
            <div style={{ width: '60%', overflow: 'hidden' }}>
              <TripTimelinePanel
                stops={stopsWithAnimation.map(stop => ({
                  ...stop,
                }))}
                scrollOffset={scrollOffset}
              />
            </div>
          </WebappContainer>
        </BrowserWindow>
      </AbsoluteFill>

      {/* Layer 3: Mouse Cursor Overlay */}
      <MouseCursor
        x={cursorX}
        y={cursorY}
        visible={cursorVisible}
        clicking={false}
      />
    </AbsoluteFill>
  );
};
