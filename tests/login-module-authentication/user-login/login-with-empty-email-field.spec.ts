import { test, expect } from '@playwright/test';

//
// GLOBAL CONFIGURATION
//
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

//
// TEST SUITE
//
test.describe('Login Module Authentication @Smmae1vky', () => {

  test('@auth MODULE-001: Login with empty email field @T3wxzi2dz', async ({ page }) => {

    //
    // STEP 1: Navigate (use relative URL only)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Leave email field empty
    //
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });

    //
    // STEP 3: Enter a password
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill('ValidPass123', { timeout: ACTION_TIMEOUT });

    //
    // STEP 4: Click Login button
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 5: Assertions (strict-mode safe)
    //
    const emailError = page.getByTestId('email-error');
    await expect(emailError).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });
    await page.waitForURL(/\/login/, { timeout: ACTION_TIMEOUT });

  });

});