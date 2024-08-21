import { useState } from "react";
import {
  WindowPosition,
  generateRandomPosition,
  bringToFront,
  getZIndex,
} from "../utils/utils";

export const useWindowManagement = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [zIndexOrder, setZIndexOrder] = useState<string[]>([]);
  const [windowPositions, setWindowPositions] = useState<{
    [key: string]: WindowPosition;
  }>({});

  const handleOpenApp = (app: string) => {
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
      setZIndexOrder([...zIndexOrder, app]);
      setWindowPositions({
        ...windowPositions,
        [app]: generateRandomPosition(),
      });
    } else {
      setZIndexOrder(bringToFront(zIndexOrder, app));
    }
  };

  const handleCloseApp = (app: string) => {
    setOpenWindows(openWindows.filter((w) => w !== app));
    setZIndexOrder(zIndexOrder.filter((w) => w !== app));
  };

  return {
    openWindows,
    zIndexOrder,
    windowPositions,
    handleOpenApp,
    handleCloseApp,
    getZIndex: (app: string) => getZIndex(zIndexOrder, app),
    bringToFront: (app: string) =>
      setZIndexOrder(bringToFront(zIndexOrder, app)),
  };
};
