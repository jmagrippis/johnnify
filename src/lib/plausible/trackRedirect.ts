export const trackRedirect = ({
	url,
	userAgent,
	userIp,
}: {
	url: string
	userAgent: string
	userIp: string | null
}) => {
	const headers = new Headers({
		'User-Agent': userAgent,
		'Content-Type': 'application/json',
	})
	if (userIp) {
		headers.set('X-Forwarded-For', userIp)
	}
	return fetch('https://plausible.io/api/event', {
		method: 'POST',
		headers,
		body: JSON.stringify({
			url,
			domain: 'johnnify.com',
			name: 'in-app-redirect',
		}),
	})
}
