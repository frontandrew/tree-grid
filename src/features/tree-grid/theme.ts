import { themeList } from "@shared/theme";
import { themeAlpine } from "ag-grid-community";

export const theme = themeAlpine
  .withParams({
    backgroundColor: "var(--background-color)",
    textColor: "var(--color)",
    borderColor: "var(--disabled-color)",
    headerTextColor: "var(--color)",
    accentColor: "var(--accent-color)",
    browserColorScheme: themeList.light,
  })
  .withParams({
    backgroundColor: "var(--background-color)",
    textColor: "var(--color)",
    borderColor: "var(--disabled-color)",
    headerTextColor: "var(--color)",
    accentColor: "var(--accent-color)",
    browserColorScheme: themeList.dark,
  });
