"use client";
import { Rnd } from "react-rnd";
import styles from "../styles/MacWindow.module.scss";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onClick: () => void;
  zIndex: number;
  initialX: number;
  initialY: number;
}
const MotionBox = motion(Box);

const MacWindow: React.FC<MacWindowProps> = ({
  title,
  children,
  onClose,
  onClick,
  zIndex,
  initialX,
  initialY,
}) => {
  const bg = useColorModeValue(
    "rgba(255, 255, 255, 0.75)",
    "rgba(26, 32, 44, 0.75)"
  );
  const textColor = useColorModeValue("gray.900", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Rnd
      default={{
        x: initialX,
        y: initialY,
        width: 600,
        height: 500,
      }}
      style={{ zIndex }}
      minWidth={300}
      minHeight={400}
      bounds="parent"
      onDragStart={onClick}
      onResizeStart={onClick}
      onMouseDown={onClick}
      dragHandleClassName={styles["window__header"]}
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MotionBox
          className={styles.window}
          bg={bg}
          color={textColor}
          backdropFilter="blur(12px)"
          border={`1px solid ${borderColor}`}
          borderRadius="xl"
          onMouseDown={onClick}
          boxShadow="lg"
        >
          <Box className={styles["window__header"]}>
            <Box display="flex" gap="0.5rem" alignItems="center">
              {/* Styled control buttons with hover states */}
              <Box
                w="12px"
                h="12px"
                borderRadius="full"
                bg="red.400"
                _hover={{ bg: "red.500" }}
                onClick={onClose}
                cursor="pointer"
              />
              <Box
                w="12px"
                h="12px"
                borderRadius="full"
                bg="yellow.400"
                _hover={{ bg: "yellow.500" }}
                cursor="pointer"
              />
              <Box
                w="12px"
                h="12px"
                borderRadius="full"
                bg="green.400"
                _hover={{ bg: "green.500" }}
                cursor="pointer"
              />
            </Box>
            <Text fontWeight="medium">{title}</Text>
            <Box width="36px" />
          </Box>
          <Box className={styles["window__content"]}>{children}</Box>
        </MotionBox>
      </motion.div>
    </Rnd>
  );
};

export default MacWindow;
