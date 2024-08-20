"use client";
import styles from "../styles/Dock.module.scss";
import { motion } from "framer-motion";
import { Box, Icon, useColorMode } from "@chakra-ui/react";
import { dockIcons } from "../config/icons";

const Dock = ({ onOpenApp }: { onOpenApp: (app: string) => void }) => {
  const { colorMode } = useColorMode();
  return (
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
  );
};

export default Dock;
