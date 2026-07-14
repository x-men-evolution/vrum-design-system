import { fireEvent, render, screen } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input', () => {
  it('renders its label', async () => {
    await render(<Input label="E-mail" />);
    expect(screen.getByText('E-mail')).toBeTruthy();
  });

  it('renders the error message when error is set', async () => {
    await render(<Input label="E-mail" error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeTruthy();
  });

  it('does not render an error message by default', async () => {
    await render(<Input label="E-mail" />);
    expect(screen.queryByText('Campo obrigatório')).toBeNull();
  });

  it('calls onFocus and onBlur', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    await render(<Input testID="email-input" label="E-mail" onFocus={onFocus} onBlur={onBlur} />);

    const textInput = screen.getByTestId('email-input');

    await fireEvent(textInput, 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);

    await fireEvent(textInput, 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('is not editable when disabled', async () => {
    await render(<Input testID="email-input" label="E-mail" disabled />);
    expect(screen.getByTestId('email-input').props.editable).toBe(false);
  });
});
