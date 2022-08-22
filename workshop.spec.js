const { test, expect } = require('@playwright/test');

test.describe(1, () => {
    test('Typing in correct credentials should log you in', async ({ page }) => {
        await page.goto('https://lunch.devbstaging.com/login-password');
        await page.locator('[name="email"]').type('Mantas.Babila@sourceryacademy.com');
        await page.locator('[name="password"]').type('nera_svarbus26');
        await page.locator('css=.v-btn__content').click();
  
        await expect(page.locator('css=.v-subheader:nth-child(2)')).toHaveText('Mantas Babila');
    });

    test('Error message should appear when logging in with incorrect credentials', async ({ page }) => {
        await page.goto('https://lunch.devbstaging.com/login-password');
        await page.locator('[name="email"]').type('Mantas.Babila@sourceryacademy.com');
        await page.locator('[name="password"]').type('nera_svarbus25');
        await page.locator('css=.v-btn__content').click();
    
        await expect(page.locator('css=.v-error__alert')).toContainText('Incorrect email or password');
    });

    test('Error message should appear when a number with 3 decimals is typed into the price field', async ({ page }) => {
        await page.goto('https://lunch.devbstaging.com/login-password');
        await page.locator('[name="email"]').type('admin2@sourceryacademy.com');
        await page.locator('[name="password"]').type('nera_svarbus31');
        await page.locator('css=.v-btn__content').click();
        await page.locator('text="Patiekalų Redagavimas" ').click();
        await page.locator('text="My Lunch" ').click();
        await page.locator('button:has-text("addPatiekalas") >> nth=0').click();
        await page.locator('xpath=//div[5]/div/div/div/div/div/div/div/div/div/input').type('0.001');
        await page.locator('xpath=//div[5]/div/div/div[2]/div/div/div/div/input').type('1');
        await page.locator('xpath=//span').click();
    
        await expect(page.locator('css=.v-error__alert')).toContainText('Price cannot have more than 2 decimals');
    });
});
