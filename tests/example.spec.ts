import { test, expect } from '@playwright/test';

test('Price alert', async ({ page }) => {
  await page.goto('https://www.perthmint.com/shop/bullion/cast-bars/perth-mint-1oz-gold-cast-bar/');

  const addToCartButton = page.locator('button.button--large', { hasText: 'Add to Cart' });

  // Better than waitForTimeout: wait for button to be attached
  await addToCartButton.waitFor({ state: 'attached', timeout: 10000 });

  if (await addToCartButton.isEnabled()) {
    console.log('In stock');

    await expect(addToCartButton).toBeEnabled();

    const priceText = await page
      .locator('div.medium-5 .price--large .price__amount')
      .textContent();

    if (!priceText) {
      throw new Error('Price not found');
    }

    // Convert "6,709.79" → 6709.79
    const price = Number(priceText.replace(/,/g, '').trim());
    console.log(price);

    expect(Number.isNaN(price)).toBeFalsy();
    expect(price).toBeGreaterThan(7000);
  } else {
    console.log('Out of stock');
  }
});
