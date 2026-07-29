import { render, screen } from '@testing-library/react-native';
import {
  ColorChipInfo,
  ColorChipLightInfoBackground,
  ColorChipLightInfoText,
  ColorChipNeutral
} from '@x-men-evolution/design-tokens/native';
import { Tag } from '../Tag';

function flattenStyle(style: unknown): Record<string, unknown> {
  return Object.assign({}, ...(Array.isArray(style) ? style : [style]));
}

describe('Tag', () => {
  it('renders its label', async () => {
    await render(<Tag>Default</Tag>);
    expect(screen.getByText('Default')).toBeTruthy();
  });

  it('applies the info color as a solid background by default', async () => {
    await render(<Tag color="info">Info</Tag>);
    const container = flattenStyle(screen.getByText('Info').parent?.props.style);
    expect(container.backgroundColor).toBe(ColorChipInfo);
  });

  it('applies the light background/text tokens when variant is light', async () => {
    await render(
      <Tag color="info" variant="light">
        Info
      </Tag>
    );
    const text = screen.getByText('Info');
    const container = flattenStyle(text.parent?.props.style);
    const textStyle = flattenStyle(text.props.style);

    expect(container.backgroundColor).toBe(ColorChipLightInfoBackground);
    expect(textStyle.color).toBe(ColorChipLightInfoText);
  });

  it('uses the neutral chip color for the neutral solid background', async () => {
    await render(<Tag color="neutral">Neutral</Tag>);
    const container = flattenStyle(screen.getByText('Neutral').parent?.props.style);
    expect(container.backgroundColor).toBe(ColorChipNeutral);
  });
});
