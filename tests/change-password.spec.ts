import {test, expect} from '@playwright/test'
import {loggedInCredentials} from './credentials'

test('anonymous user gets redirected to login', async ({page}) => {
	await page.goto('/auth/change-password')

	await expect(page).toHaveURL('/login')
	await expect(page).toHaveTitle(/Login/)
	await expect(
		page.getByRole('heading', {name: 'Login', level: 1}),
	).toBeVisible()
})

test.describe(() => {
	test.use({storageState: loggedInCredentials})

	test('logged in user can see the form to change their password', async ({
		page,
	}) => {
		await page.goto('/auth/change-password')

		await expect(page).toHaveTitle(/Change password/)
		await expect(
			page.getByRole('heading', {name: 'Change your password', level: 1}),
		).toBeVisible()
		await expect(page.getByLabel('password')).toBeVisible()
		await expect(
			page.getByRole('button', {name: 'change password'}),
		).toBeVisible()
	})
})
