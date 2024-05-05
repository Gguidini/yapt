import { expect, test } from '@playwright/test';

test.describe('Main page elements', async () => {
	test('settings toggle has toggle button visible, but inputs invisible', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByTitle('settings_toggle')).toBeVisible();
		await expect(page.getByTitle('clock_type_selector')).toBeHidden();
	});
});
