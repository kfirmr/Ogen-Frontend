import { type FC } from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline, createTheme } from "@mui/material";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { type IProviderProps } from "../interfaces/provider-props";

const MUI_OVERRIDES = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "'Rubik', sans-serif",
  },
  palette: {
    background: {
      default: "#FDFDF9",
    },
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const MuiThemeProvider: FC<IProviderProps> = ({ children }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={MUI_OVERRIDES}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MuiThemeProvider;
