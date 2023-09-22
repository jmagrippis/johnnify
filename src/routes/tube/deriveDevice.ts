export const deriveDevice = (userAgent: string | null) => {
	if (!userAgent) return 'other'

	if (/Android/.test(userAgent)) {
		return 'android'
	}

	if (/iPad|iPhone/.test(userAgent)) {
		return 'iOS'
	}

	return 'other'
}
