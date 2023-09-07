const STORAGE_KEY = 'theme'

const getColorPreference = () => {
	const currentTheme = localStorage.getItem(STORAGE_KEY)
	console.log(currentTheme)
	return currentTheme ?? 'auto'
}

// set early so no page flashes / CSS is made aware
document.documentElement.dataset.theme = getColorPreference()
