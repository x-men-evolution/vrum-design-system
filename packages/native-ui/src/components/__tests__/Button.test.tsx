import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders its label', async () => {
    await render(<Button>Continuar</Button>);
    expect(screen.getByText('Continuar')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<Button onPress={onPress}>Continuar</Button>);

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Button disabled onPress={onPress}>
        Continuar
      </Button>
    );

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes accessibilityState.disabled', async () => {
    await render(<Button disabled>Continuar</Button>);
    expect(screen.getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });
});
