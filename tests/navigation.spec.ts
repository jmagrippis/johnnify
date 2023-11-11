import {test, expect} from '@playwright/test'

test('navigation smoke test', async ({page}) => {
	// start at the home page
	await page.goto('/')

	await expect(page).toHaveTitle(/Johnnify/)
	await expect(
		page.getByRole('heading', {name: 'Johnnify', level: 1}),
	).toBeVisible()

	// navigate to the Ask Page
	await page.getByRole('link', {name: 'ask'}).click()
	await expect(page).toHaveTitle(/Ask/)
	await expect(
		page.getByRole('heading', {name: 'Ask & learn', level: 1}),
	).toBeVisible()

	// navigate to the Learn Page
	await page.getByRole('link', {name: 'learn'}).click()
	await expect(
		page.getByRole('heading', {
			name: 'Start building with SvelteKit',
			level: 1,
		}),
	).toBeVisible()
	await expect(page).toHaveTitle(/Learn SvelteKit/)

	// navigate to the Videos Page
	await page.getByRole('link', {name: 'videos'}).click()
	await expect(
		page.getByRole('heading', {name: 'Latest Videos', level: 1}),
	).toBeVisible()
	await expect(page).toHaveTitle(/Latest Videos/)

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
