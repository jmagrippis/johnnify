import {expect, it} from 'bun:test'
import {deriveDevice} from './deriveDevice'

it('classifies desktop Chrome User Agent as "other"', () => {
	const userAgent =
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'

	expect(deriveDevice(userAgent)).toBe('other')
})

it('classifies an iPhone User Agent as "iOS"', () => {
	const userAgent =
		'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'

	expect(deriveDevice(userAgent)).toBe('iOS')
})

it('classifies an iPad User Agent as "iOS"', () => {
	const userAgent =
		'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'

	expect(deriveDevice(userAgent)).toBe('iOS')
})

it('classifies an android User Agent as "android"', () => {
	const userAgent =
		'Mozilla/5.0 (Linux; Android 8.1.0; SAMSUNG SM-N960F Build/M1AJQ) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.0 Chrome/63.0.3239.111 Mobile Safari/537.36'

	expect(deriveDevice(userAgent)).toBe('android')
})

it('classifies `null` User Agent as "other"', () => {
	const userAgent = null

	expect(deriveDevice(userAgent)).toBe('other')
})
