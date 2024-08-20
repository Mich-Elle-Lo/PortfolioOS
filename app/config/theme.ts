import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.800" : "gray.100",
      color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
      backgroundImage:
        props.colorMode === "dark"
          ? "url('/darkbg.jpeg') !important"
          : "url('/lightbg.jpeg') !important",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    },
  }),
};

const customTheme = extendTheme({
  config,
  styles,
});

export default customTheme;
