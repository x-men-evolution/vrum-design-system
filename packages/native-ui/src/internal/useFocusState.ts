import { useState } from 'react';

// Estado de foco controlado com repasse dos callbacks originais. Genérico no
// tipo do evento porque TextInput (TextInputFocusEventData) e Pressable
// (TargetedEvent) emitem eventos de foco diferentes.
export function useFocusState<E>(onFocus?: (event: E) => void, onBlur?: (event: E) => void) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: E) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: E) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return { isFocused, handleFocus, handleBlur };
}
