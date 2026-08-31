import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { IconButton } from '../IconButton';

describe('IconButton', () => {
  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<IconButton icon={X} onPress={onPress} accessibilityLabel="Fechar" />);

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<IconButton icon={X} disabled onPress={onPress} accessibilityLabel="Fechar" />);

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes accessibilityState.disabled', async () => {
    await render(<IconButton icon={X} disabled accessibilityLabel="Fechar" />);
    expect(screen.getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('defaults to the outline variant', async () => {
    await render(<IconButton icon={X} accessibilityLabel="Fechar" />);
    const style = StyleSheet.flatten(screen.getByRole('button').props.style);
    expect(style.borderWidth).toBe(1);
  });

  it('renders the ghost variant without a border', async () => {
    await render(<IconButton icon={X} variant="ghost" accessibilityLabel="Fechar" />);
    const style = StyleSheet.flatten(screen.getByRole('button').props.style);
    expect(style.borderWidth).toBeUndefined();
  });
});
