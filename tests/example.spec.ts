import { test, expect } from '@playwright/test';

test.only('Price alert', async ({ page }) => {
  await page.goto('https://www.perthmint.com/shop/bullion/cast-bars/perth-mint-1oz-gold-cast-bar/');
  const addToCartButton = page.locator('button.button--large', { hasText: 'Add to Cart' });
  await page.waitForTimeout(10000);
  // Check if it is enabled
  if (await addToCartButton.isEnabled()) {
    console.log('In stock')
    await expect(addToCartButton).toBeEnabled();
    const price = await page.locator(`div.medium-5 .price--large .price__amount`).textContent();
    console.log(price);
  } else { console.log('Out of stock') }
});


