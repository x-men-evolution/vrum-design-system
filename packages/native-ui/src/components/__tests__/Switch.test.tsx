import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Switch } from '../Switch';

describe('Switch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('exposes accessibilityState.checked', async () => {
    await render(<Switch value />);
    expect(screen.getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('calls onValueChange with the toggled value', async () => {
    const onValueChange = jest.fn();
    await render(<Switch value={false} onValueChange={onValueChange} />);

    await fireEvent.press(screen.getByRole('switch'));
    await act(async () => {
      jest.runAllTimers();
    });

    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', async () => {
    const onValueChange = jest.fn();
    await render(<Switch value={false} onValueChange={onValueChange} disabled />);

    await fireEvent.press(screen.getByRole('switch'));
    await act(async () => {
      jest.runAllTimers();
    });

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
