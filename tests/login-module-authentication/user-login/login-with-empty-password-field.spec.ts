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
test.describe('Login Module Authentication @S607bk5pn', () => {

  test('@auth MODULE-001: Login with empty password field @Toqai59y5', async ({ page }) => {

    //
    // STEP 1: Navigate (use relative URL only)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Enter valid email address (Email is accepted)
    //
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill('user@example.com', { timeout: ACTION_TIMEOUT });
    await expect(emailInput).toHaveValue('user@example.com', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Leave password field empty (Password field is empty)
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill('', { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveValue('', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Click Login button (Validation error displayed and submission blocked)
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const passwordError = page.getByTestId('password-error');
    await expect(passwordError).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(page).toHaveURL(/\/login$/, { timeout: EXPECT_TIMEOUT });

  });

});