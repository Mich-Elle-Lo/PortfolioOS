"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import styles from "../styles/MacWindow.module.scss";
import { Box, Text } from "@chakra-ui/react";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const MacWindow = ({ title, children, onClose }: MacWindowProps) => {
  const [zIndex, setZIndex] = useState(1);

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
      <Box className={styles.window} onMouseDown={() => setZIndex(1000)}>
        <Box className={styles["window__header"]}>
          <Text>{title}</Text>
          <Box className={styles["window__close"]} onClick={onClose}>
            &#10005;
          </Box>
        </Box>
        <Box className={styles["window__content"]}>{children}</Box>
      </Box>
    </Rnd>
  );
};

export default MacWindow;
