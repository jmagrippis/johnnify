import {test, expect} from '@playwright/test'
import {loggedInCredentials} from './credentials'

test('anonymous user gets redirected to login', async ({page}) => {
	await page.goto('/profile')

	await expect(page).toHaveURL('/login')
	await expect(page).toHaveTitle(/Login/)
	await expect(
		page.getByRole('heading', {name: 'Login', level: 1}),
	).toBeVisible()
})

test.describe(() => {
	test.use({storageState: loggedInCredentials})

	test('logged in user can see their profile', async ({page}) => {
		await page.goto('/profile')

		await expect(page).toHaveTitle(/Profile/)
		await expect(
			page.getByRole('heading', {name: 'Profile', level: 1}),
		).toBeVisible()
	})
})
