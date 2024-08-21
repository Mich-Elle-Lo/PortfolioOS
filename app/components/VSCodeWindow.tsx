import { Box } from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface GitHubWindowProps {
  onClose: () => void;
  zIndex: number;

  initialX: number;
  initialY: number;
}

const VSCodeWindow: React.FC<GitHubWindowProps> = ({
  onClose,
  zIndex,

  initialX,
  initialY,
}) => {
  return (
    <MacWindow
      title="VSCode - PortfolioOS"
      onClose={onClose}
      zIndex={0}
      initialX={initialX}
      initialY={initialY}
    >
      <Box height="100%" width="100%" overflow="hidden">
        <iframe
          src="https://github1s.com/Mich-Elle-Lo/PortfolioOS"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="VSCode PortfolioOS"
        />
      </Box>
    </MacWindow>
  );
};

export default VSCodeWindow;
