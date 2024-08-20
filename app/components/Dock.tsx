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
      const showThreshold = window.innerHeight - 30;
      const hideThreshold = window.innerHeight - 80 * 5;
      if (event.clientY >= showThreshold) {
        setIsVisible(true);
      } else if (event.clientY <= hideThreshold) {
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            y: {
              type: "spring",
              damping: 10,
              stiffness: 70,
              restDelta: 0.001,
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
