const STORAGE_KEY = 'theme'

const getColorPreference = () => {
	const currentTheme = localStorage.getItem(STORAGE_KEY)
	if (currentTheme) return currentTheme

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

// set early so no page flashes / CSS is made aware
document.documentElement.dataset.theme = getColorPreference()
