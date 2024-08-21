import React from "react";
import { Box } from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import EmailForm from "./EmailForm";

type MailWindowProps = {
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
  initialX: number;
  initialY: number;
};

const MailWindow = ({
  onClose,
  zIndex,
  onClick,
  initialX,
  initialY,
}: MailWindowProps) => {
  return (
    <MacWindow
      title="Mail"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box height="100%" width="100%" overflow="auto" p="1rem">
        <EmailForm />
      </Box>
    </MacWindow>
  );
};

export default MailWindow;
