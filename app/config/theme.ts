import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f0f0f0",
        color: "black",
      },
    },
  },
  colors: {
    primary: "#0070f3",
    secondary: "#1e1e1e",
  },
});
