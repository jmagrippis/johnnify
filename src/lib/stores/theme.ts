import {writable} from 'svelte/store'

const themes = ['light', 'dark'] as const
export type Theme = (typeof themes)[number]

export const isTheme = (theme: unknown): theme is Theme =>
	typeof theme === 'string' && themes.includes(theme as Theme)

export const theme = writable<Theme | null>(null)
