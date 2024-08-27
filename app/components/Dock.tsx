"use client";
import styles from "../styles/Dock.module.scss";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Icon, useColorMode, Tooltip } from "@chakra-ui/react";
import { DesktopDockIcons } from "../config/desktopDockIcons";

const Dock = ({ onOpenApp }: { onOpenApp: (app: string) => void }) => {
  const { colorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const dockHeight = 80;
      const threshold = window.innerHeight - dockHeight * 2;
      if (event.clientY >= threshold) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className={styles.dockContainer}
      style={{
        transformOrigin: "center bottom",
      }}
      initial={{ scale: 1 }}
      animate={{ scale: isHovering ? 1 : 1, opacity: isHovering ? 1 : 0.4 }}
      transition={{
        y: {
          type: "tween",
          duration: 0.5,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
    >
      <Box
        className={styles.dock}
        bg={colorMode === "light" ? "gray.400" : "gray.700"}
      >
        {DesktopDockIcons.map(({ icon, label, action }) => (
          <Tooltip
            label={label}
            key={label}
            fontSize="md"
            placement="top"
            hasArrow
            offset={[0, 20]}
          >
            <motion.div
              key={label}
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={styles["dock__icon"]}
              onClick={() => onOpenApp(action)}
            >
              <Icon as={icon} w={10} h={10} color="white" />
            </motion.div>
          </Tooltip>
        ))}
      </Box>
    </motion.div>
  );
};

export default Dock;
