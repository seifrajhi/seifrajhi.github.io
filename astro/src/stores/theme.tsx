import type { Themes } from '@components/ThemeSwitcher';
import { persistentAtom } from '@nanostores/persistent'


export const themeStore = persistentAtom<Themes>("theme", "light");