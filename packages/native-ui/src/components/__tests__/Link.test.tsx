import { fireEvent, render, screen } from '@testing-library/react-native';
import { Link } from '../Link';

describe('Link', () => {
  it('renders its label', async () => {
    await render(<Link onPress={() => {}}>Esqueceu sua senha?</Link>);
    expect(screen.getByText('Esqueceu sua senha?')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<Link onPress={onPress}>Cadastre-se aqui</Link>);

    await fireEvent.press(screen.getByRole('link'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Link disabled onPress={onPress}>
        Cadastre-se aqui
      </Link>
    );

    await fireEvent.press(screen.getByRole('link'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes accessibilityState.disabled', async () => {
    await render(<Link disabled>Cadastre-se aqui</Link>);
    expect(screen.getByRole('link').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });
});
