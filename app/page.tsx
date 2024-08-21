"use client";
import { useState } from "react";
import Dock from "./components/Dock";
import MacWindow from "./components/MacWindow";
import BrowserWindow from "./components/BrowserWindow";
import DocumentViewer from "./components/DocumentViewer";
import TopBar from "./components/TopBar";
import MobileWarning from "./components/MobileWarning";
import VSCodeWindow from "./components/VSCodeWindow";
import GitHubWindow from "./components/GitHubWindow";
import { Box, useColorMode } from "@chakra-ui/react";

interface WindowPosition {
  x: number;
  y: number;
}

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [zIndexOrder, setZIndexOrder] = useState<string[]>([]);
  const [windowPositions, setWindowPositions] = useState<{
    [key: string]: WindowPosition;
  }>({});
  const { colorMode } = useColorMode();

  const generateRandomPosition = (): WindowPosition => {
    const maxX = window.innerWidth - 700;
    const maxY = window.innerHeight - 600 - 60;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY) + 60;
    return { x, y };
  };

  const handleOpenApp = (app: string) => {
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
      setZIndexOrder([...zIndexOrder, app]);
      setWindowPositions({
        ...windowPositions,
        [app]: generateRandomPosition(),
      });
    } else {
      bringToFront(app);
    }
  };

  const handleCloseApp = (app: string) => {
    setOpenWindows(openWindows.filter((w) => w !== app));
    setZIndexOrder(zIndexOrder.filter((w) => w !== app));
  };

  const bringToFront = (app: string) => {
    setZIndexOrder([...zIndexOrder.filter((w) => w !== app), app]);
  };
  const getZIndex = (app: string) => {
    return zIndexOrder.indexOf(app) + 1;
  };

  return (
    <MobileWarning>
      <Box
        style={{
          height: "100vh",
          paddingTop: "60px",
          backgroundImage:
            colorMode === "light"
              ? "url('/lightbg.jpeg')"
              : "url('/darkbg.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        }}
      >
        <TopBar />
        <Dock onOpenApp={handleOpenApp} />

        {openWindows.map((app, index) => {
          const { x, y } = windowPositions[app] || { x: 150, y: 60 };
          const zIndex = getZIndex(app);
          const commonProps = {
            onClose: () => handleCloseApp(app),
            zIndex,
            onClick: () => bringToFront(app),
            initialX: x,
            initialY: y,
          };

          switch (app) {
            case "finder":
              return (
                <MacWindow title="Finder" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );
            case "files":
              return (
                <MacWindow title="Files" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );

            case "browser":
              return <BrowserWindow {...commonProps} key={app} />;

            case "projects":
              return (
                <MacWindow title="Projects" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );
            case "document":
              return (
                <MacWindow title="Document Viewer" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );
            case "vscode":
              return <VSCodeWindow {...commonProps} key={app} />;
            case "github":
              return <GitHubWindow {...commonProps} key={app} />;
            default:
              return null;
          }
        })}
      </Box>
    </MobileWarning>
  );
}
