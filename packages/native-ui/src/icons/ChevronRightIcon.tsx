import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

export type IconProps = {
  size?: number;
  color?: string;
} & Omit<SvgProps, 'width' | 'height' | 'color'>;

export function ChevronRightIcon({ size = 24, color = '#ffffff', ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="m9 18 6-6-6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
