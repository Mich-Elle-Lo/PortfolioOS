import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#f0f0f0", "#1e1e1e")(props),
        color: mode("black", "white")(props),
      },
    }),
  },
  colors: {
    primary: "#0070f3",
    secondary: "#1e1e1e",
  },
});
