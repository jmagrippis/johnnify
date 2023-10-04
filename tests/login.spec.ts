import {test, expect} from '@playwright/test'
import {loggedInCredentials} from './credentials'

test.describe(() => {
	test.use({storageState: loggedInCredentials})

	test('logged in user cannot go to the login page', async ({page}) => {
		await page.goto('/login')

		await expect(page).toHaveURL('/profile')
		await expect(page).toHaveTitle(/Profile/)
		await expect(
			page.getByRole('heading', {name: 'Profile', level: 1}),
		).toBeVisible()
	})
})
