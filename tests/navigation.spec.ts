import {test, expect} from '@playwright/test'

test('navigation smoke test', async ({page}) => {
	// start at the home page
	await page.goto('/')

	await expect(page).toHaveTitle(/Johnnify/)
	await expect(
		page.getByRole('heading', {name: 'Johnnify', level: 1}),
	).toBeVisible()

	// navigate to the Demos Page
	await page.getByRole('link', {name: 'demos'}).click()
	await expect(page).toHaveTitle(/Text Gradients/)
	await expect(
		page.getByRole('heading', {name: 'Text Gradients', level: 1}),
	).toBeVisible()

	// navigate to the Login Page
	await page.getByRole('link', {name: 'login'}).click()
	await expect(page).toHaveTitle(/Login/)
	await expect(
		page.getByRole('heading', {name: 'Login', level: 1}),
	).toBeVisible()

	// can go back to the homepage
	await page.getByRole('link', {name: 'Johnnify'}).click()
	await expect(page).toHaveTitle(/Johnnify/)
	await expect(
		page.getByRole('heading', {name: 'Johnnify', level: 1}),
	).toBeVisible()
})
