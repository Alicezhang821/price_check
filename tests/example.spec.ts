import { test, expect } from '@playwright/test';
import fs from 'fs';
test('Price alert', async ({ page }) => {
  await page.goto('https://www.perthmint.com/shop/bullion/cast-bars/perth-mint-1oz-gold-cast-bar/');
  await page.locator(`button#onetrust-reject-all-handler`).click();
  const addToCartButton = page.locator('button.button--large', { hasText: 'Add to Cart' });
  await page.waitForTimeout(5000);
  const isEnabled = await addToCartButton.isEnabled({ timeout: 15000 });

  if (isEnabled) {
    const priceLocator = page.locator('div.medium-5 .price--large .price__amount');
    await expect(priceLocator).toHaveText(/[\d,]+\.\d{2}/, { timeout: 15000 });

    const priceText = await priceLocator.textContent();

    if (!priceText) {
      throw new Error('Price not found');
    }
    // Convert "6,709.79" → 6709.79
    const price = Number(priceText.replace(/,/g, '').trim());
    console.log(price);
    fs.writeFileSync('price.txt', price.toString());
    expect(price).toBeGreaterThan(6000);
  } else {
    console.log('Out of stock');
  }
});
