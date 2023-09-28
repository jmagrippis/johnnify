import {test, expect} from '@playwright/test'
import {loggedInCredentials} from './credentials'

test('login page', async ({page}) => {
	// start at the home page
	await page.goto('/login')

	await expect(page).toHaveTitle(/Login/)
	await expect(
		page.getByRole('heading', {name: 'Login', level: 1}),
	).toBeVisible()

	await expect(
		page.getByRole('button', {name: 'Login with Github'}),
	).toBeVisible()

	// user can see the form to create a new account

	await page.getByRole('button', {name: 'create a new account'}).click()
	await expect(page.getByRole('button', {name: 'Signup'})).toBeVisible()
})

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
