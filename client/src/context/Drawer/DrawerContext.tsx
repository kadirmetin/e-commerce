import { Drawer } from "@mui/material";
import type { FC } from "react";
import {
  Fragment,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import DrawerContent from "./components/DrawerContent";

interface DrawerContextProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
  content: string;
  anchor_: "top" | "right" | "bottom" | "left";
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [anchor_, setAnchor_] = useState<"top" | "right" | "bottom" | "left">(
    "left"
  );

  const toggleDrawer = (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => {
    setOpen(newOpen);
    setContent(drawerContent);
    setAnchor_(anchor);
  };

  return (
    <DrawerContext.Provider value={{ toggleDrawer, content, anchor_ }}>
      <Fragment>{children}</Fragment>
      <>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          anchor={anchor_}
          PaperProps={{
            className: "w-2/3 lg:w-1/4",
          }}
        >
          <DrawerContent content={content} toggleDrawer={toggleDrawer} />
        </Drawer>
      </>
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
