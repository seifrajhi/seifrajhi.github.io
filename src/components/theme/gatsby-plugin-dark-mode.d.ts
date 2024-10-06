
declare module 'gatsby-plugin-dark-mode' {

    export const ThemeToggler: React.ComponentType<{
  
      children: (props: { theme: string; toggleTheme: (theme: string) => void }) => JSX.Element;
  
    }>;
  
  }
  