import { AbsoluteFill, Series } from 'remotion';
import { Background } from './components/Background';
import { BrowserScene } from './scenes/BrowserScene';
import { ServerScene } from './scenes/ServerScene';

// Overall timing orchestrated by Series
const BROWSER_SCENE_DURATION = 355;
const SERVER_SCENE_DURATION = 300;

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      {/* Background stays active across all scenes */}
      <Background gradient={true} />

      <Series>
        {/* Browser Scene: Chat, Timeline, Button Click, and Rotation Out */}
        <Series.Sequence durationInFrames={BROWSER_SCENE_DURATION}>
          <BrowserScene />
        </Series.Sequence>

        {/* Server Scene: Rotation In and Processing (Empty for now) */}
        <Series.Sequence durationInFrames={SERVER_SCENE_DURATION} offset={-1}>
          <ServerScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
