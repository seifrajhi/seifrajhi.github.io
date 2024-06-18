import * as React from "react"
import { useState } from "react"

import { ThemeToggler } from "gatsby-plugin-dark-mode"

import "./theme-switcher.css"

export enum Themes {
  DARK = `dark`,
  LIGHT = `light`,
}

interface ThemeProps {
  theme: string
  toggleTheme: (themeName: string) => void
}

const ThemeSwitcher = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: ThemeProps): JSX.Element => {
        setDarkMode(theme === Themes.DARK)

        const switchTheme = (): void => {
          const newState = !darkMode

          setDarkMode(newState)
          toggleTheme(newState ? Themes.DARK : Themes.LIGHT)
        }

        const classNames: string =
          "theme-switcher-toggler" +
          (darkMode ? " theme-switcher-toggler--checked" : "")

        return (
          <div className={classNames} onClick={switchTheme}>
            <div className="theme-switcher-track" />
            <div className="theme-switcher-thumb" />

            <input
              className="theme-switcher-input"
              type="checkbox"
              checked={theme === Themes.DARK}
              readOnly={true}
              aria-label="Switch between Dark and Light modes"
            />
          </div>
        )
      }}
    </ThemeToggler>
  )
}

export default ThemeSwitcher
