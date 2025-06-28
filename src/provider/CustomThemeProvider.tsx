import { useTheme, ThemeProvider } from "next-themes";
import React from "react";

export const useThemePreference = useTheme;

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      themes={["light", "dark"]}
      disableTransitionOnChange={true}
      enableSystem={true}
      storageKey="theme"
      defaultTheme="system"
      attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
