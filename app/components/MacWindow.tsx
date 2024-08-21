"use client";

import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import styles from "../styles/MacWindow.module.scss";
import { Box, Text, useColorMode } from "@chakra-ui/react";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
}

const MacWindow = ({
  title,
  children,
  onClose,
  zIndex,
  onClick,
}: MacWindowProps) => {
  const { colorMode } = useColorMode();

  return (
    <Rnd
      default={{
        x: 150,
        y: 150,
        width: 600,
        height: 500,
      }}
      style={{ zIndex, border: "1px solid #ccc", borderRadius: "8px" }}
      minWidth={300}
      minHeight={400}
      bounds="parent"
      onDragStart={onClick}
      onResizeStart={onClick}
      onMouseDown={onClick}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <Box
        className={styles.window}
        bg={colorMode === "light" ? "white" : "gray.800"}
        color={colorMode === "light" ? "black" : "white"}
        onMouseDown={onClick}
        cursor="default"
      >
        <Box
          className={styles["window__header"]}
          bg={colorMode === "light" ? "gray.100" : "gray.700"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="0.5rem"
          cursor="move"
        >
          <Box display="flex" gap="0.5rem">
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
