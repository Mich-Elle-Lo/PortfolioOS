import { Box } from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface GitHubWindowProps {
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
}

const VSCodeWindow: React.FC<GitHubWindowProps> = ({
  onClose,
  zIndex,
  onClick,
}) => {
  return (
    <MacWindow title="VSCode - PortfolioOS" onClose={onClose}>
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
