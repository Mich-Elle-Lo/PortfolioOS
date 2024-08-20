"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import styles from "../styles/MacWindow.module.scss";
import { Box, Text, useColorMode } from "@chakra-ui/react";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const MacWindow = ({ title, children, onClose }: MacWindowProps) => {
  const [zIndex, setZIndex] = useState(1);
  const { colorMode } = useColorMode();
  return (
    <Rnd
      default={{
        x: 150,
        y: 150,
        width: 600,
        height: 400,
      }}
      style={{ zIndex }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      onDragStart={() => setZIndex(1000)}
      onResizeStart={() => setZIndex(1000)}
    >
      <Box
        className={styles.window}
        onMouseDown={() => setZIndex(1000)}
        bg={colorMode === "light" ? "white" : "gray.800"}
        color={colorMode === "light" ? "black" : "white"}
      >
        <Box
          className={styles["window__header"]}
          bg={colorMode === "light" ? "gray.100" : "gray.700"} // Dynamic header background color
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="0.5rem"
        >
          <Box display="flex" gap="0.5rem">
            {/* macOS style window controls */}
            <Box
              w="12px"
              h="12px"
              borderRadius="50%"
              bg="red.500"
              cursor="pointer"
              onClick={onClose}
            />
            <Box
              w="12px"
              h="12px"
              borderRadius="50%"
              bg="yellow.500"
              cursor="pointer"
            />
            <Box
              w="12px"
              h="12px"
              borderRadius="50%"
              bg="green.500"
              cursor="pointer"
            />
          </Box>
          <Text>{title}</Text>
          <Box width="36px" />
        </Box>
        <Box
          className={styles["window__content"]}
          color={colorMode === "light" ? "black" : "white"}
        >
          {children}
        </Box>
      </Box>
    </Rnd>
  );
};

export default MacWindow;
