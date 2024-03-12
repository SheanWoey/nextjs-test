"use client";

import { type Direction } from "@mui/material/styles";
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";

// ============================================================
export interface SettingsOptions {
  direction: Direction;
}
// ============================================================

// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCAL STORAGE
const initialSettings: SettingsOptions = { direction: "ltr" };

export const SettingsContext = createContext({
  settings: initialSettings,
  // eslint-disable-next-line
  updateSettings: (_arg: SettingsOptions) => {},
});

const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState(initialSettings);

  const updateSettings = (updatedSetting: SettingsOptions) => {
    setSettings(updatedSetting);
    window.localStorage.setItem("settings", JSON.stringify(updatedSetting));
  };

  useEffect(() => {
    if (!window) return;
    const getItem = window.localStorage.getItem("settings");
    if (getItem) setSettings(JSON.parse(getItem));
    else setSettings(initialSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
