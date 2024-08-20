import "./styles/global.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./config/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
