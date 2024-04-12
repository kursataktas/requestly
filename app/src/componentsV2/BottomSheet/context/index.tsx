import React, { createContext, useState, useContext } from "react";

interface BottomSheetContextProps {
  isBottomSheetOpen: boolean;
  viewAsSidePanel: boolean;
  toggleBottomSheet: () => void;
  toggleViewAsSidePanel: () => void;
  openBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [viewAsSidePanel, setViewSideAsPanel] = useState(false);

  const toggleBottomSheet = () => setIsBottomSheetOpen(!isBottomSheetOpen);
  const toggleViewAsSidePanel = () => setViewSideAsPanel(!viewAsSidePanel);
  const openBottomSheet = () => setIsBottomSheetOpen(true);

  return (
    <BottomSheetContext.Provider
      value={{ isBottomSheetOpen, viewAsSidePanel, toggleBottomSheet, toggleViewAsSidePanel, openBottomSheet }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomPanel must be used within a BottomPanelProvider");
  }
  return context;
};
