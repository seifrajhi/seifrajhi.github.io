import * as React from "react"
import { useState, useEffect } from "react"
import { useStore } from "@nanostores/react"
import { themeStore } from "../stores/theme"

import "./ThemeSwitcher.css"

export enum Themes {
  DARK = `dark`,
  LIGHT = `light`,
}

interface ThemeProps {
  theme: string
  toggleTheme: (themeName: string) => void
}

const ThemeSwitcher = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  const $theme = useStore(themeStore);

  const switchTheme = () => {
    themeStore.set($theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT);
  };

  useEffect(() => {

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    darkQuery.addListener((e) => {
      themeStore.set(e.matches ? Themes.DARK : Themes.LIGHT)
    })

    setMounted(true)
  });

  if (!mounted) {
    return <></>
  }

  themeStore.subscribe(theme => {
    if (theme === Themes.DARK) {
      document.documentElement.classList.add(Themes.DARK);
    } else {
      document.documentElement.classList.remove(Themes.DARK);
    }
  })

  return (
    <div className="theme-switcher">
      <div className={"theme-switcher-toggler" + ($theme === Themes.DARK ? " theme-switcher-toggler--checked" : "")} onClick={switchTheme}>
        <div className="theme-switcher-track" />
        <div className="theme-switcher-thumb" />

        <input
          className="theme-switcher-input"
          type="checkbox"
          checked={$theme === Themes.DARK}
          readOnly={true}
          aria-label="Switch between dark and light themes"
        />
      </div>
    </div>
  )
}

export default ThemeSwitcher
