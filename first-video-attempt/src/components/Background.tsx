import { AbsoluteFill } from 'remotion';

interface BackgroundProps {
  color?: string;
  gradient?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({
  color = 'bg-gray-50',
  gradient = false
}) => {
  const bgClass = gradient
    ? 'bg-gradient-to-br from-blue-50 to-purple-50'
    : color;

  return (
    <AbsoluteFill className={`${bgClass}`} />
  );
};
