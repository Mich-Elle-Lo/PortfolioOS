"use client";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      position="fixed"
      top="10px"
      right="10px"
      bg="transparent"
      _hover={{ bg: "transparent" }}
    />
  );
};

export default ThemeToggle;
