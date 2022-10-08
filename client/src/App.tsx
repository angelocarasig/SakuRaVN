import React from "react";
import "./App.css";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={"dark"}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>

        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
