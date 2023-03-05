import { expect, test } from '@playwright/test';

test('table elements intercepted', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
});
