import { render, screen } from '@testing-library/react-native';
import { defaultTheme, prestadorTheme } from '@x-men-evolution/design-tokens/themes';
import { Button } from '../../components/Button';
import { Tag } from '../../components/Tag';
import { VrumThemeProvider } from '../ThemeProvider';

function flattenStyle(style: unknown): Record<string, unknown> {
  return Object.assign({}, ...(Array.isArray(style) ? style.flat(Infinity) : [style]));
}

function buttonBackground(): unknown {
  return flattenStyle(screen.getByRole('button').props.style).backgroundColor;
}

function tagBackground(label: string): unknown {
  return flattenStyle(screen.getByText(label).parent?.props.style).backgroundColor;
}

describe('VrumThemeProvider', () => {
  it('usa o tema default quando nenhum provider é montado', async () => {
    await render(<Button>Continuar</Button>);
    expect(buttonBackground()).toBe(defaultTheme.action.default);
  });

  it('troca a cor de marca quando o tema prestador é fornecido', async () => {
    await render(
      <VrumThemeProvider theme={prestadorTheme}>
        <Button>Continuar</Button>
      </VrumThemeProvider>
    );

    expect(buttonBackground()).toBe(prestadorTheme.action.default);
    expect(buttonBackground()).not.toBe(defaultTheme.action.default);
  });

  // Feedback (erro/destrutivo) é mode-invariant por decisão de produto: o mode
  // repõe apenas os aliases de marca, nunca a ramp vermelha. Um botão
  // "destructive" precisa continuar vermelho no app do prestador.
  it('mantém o destrutivo vermelho no tema prestador', async () => {
    await render(
      <VrumThemeProvider theme={prestadorTheme}>
        <Button variant="destructive">Excluir</Button>
      </VrumThemeProvider>
    );

    expect(buttonBackground()).toBe(defaultTheme.action.destructive.default);
  });

  it('tematiza o chip de marca sem afetar o de feedback', async () => {
    await render(
      <VrumThemeProvider theme={prestadorTheme}>
        <Tag color="primary">Novo</Tag>
        <Tag color="danger">Falhou</Tag>
      </VrumThemeProvider>
    );

    expect(tagBackground('Novo')).toBe(prestadorTheme.chip.primary);
    expect(tagBackground('Falhou')).toBe(defaultTheme.chip.danger);
  });
});
