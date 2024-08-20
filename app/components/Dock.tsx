"use client";
import styles from "../styles/Dock.module.scss";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Icon, useColorMode } from "@chakra-ui/react";
import { dockIcons } from "../config/icons";

const Dock = ({ onOpenApp }: { onOpenApp: (app: string) => void }) => {
  const { colorMode } = useColorMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const threshold = window.innerHeight - 30; // 2/3 rem from bottom
      if (event.clientY >= threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.dockContainer}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Box
            className={styles.dock}
            bg={colorMode === "light" ? "gray.400" : "gray.700"}
          >
            {dockIcons.map(({ icon, label, action }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={styles["dock__icon"]}
                onClick={() => onOpenApp(action)}
              >
                <Icon as={icon} w={10} h={10} color="white" />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dock;
