import {test as setup, expect} from '@playwright/test'
import {loggedInCredentials} from './credentials'

setup('authenticate as a regular loggedIn user', async ({page}) => {
	await page.goto('/login')

	await page
		.getByLabel('email')
		.fill('johnnifytech+playwright-logged-in@gmail.com')
	await page
		.getByLabel('password')
		.fill(process.env.PLAYWRIGHT_LOGGED_IN_PASSWORD as string)
	await page.getByRole('button', {name: 'Login with email'}).click()

	// Wait until the page receives the cookies.
	// Wait until the page reaches a state where all cookies are set.
	await expect(
		page.getByRole('heading', {name: 'Profile', level: 1}),
	).toBeVisible()

	// End of authentication steps.
	await page.context().storageState({path: loggedInCredentials})
})
