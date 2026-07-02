'use client';

import { ChakraProvider as ChakraUIProvider, defaultSystem } from '@chakra-ui/react';
import { EmotionRegistry } from './EmotionRegistry';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraUIProvider value={defaultSystem}>{children}</ChakraUIProvider>
    </EmotionRegistry>
  );
}
