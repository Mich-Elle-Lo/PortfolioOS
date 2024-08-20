"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import customTheme from "./config/theme";

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
