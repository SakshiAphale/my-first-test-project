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
test.describe('Login Module Authentication @Saf2mj9jw', () => {

  test('@auth MODULE-001: Login with incorrect password (single attempt) @Tweg8moe2', async ({ page }) => {

    //
    // STEP 1: Enter valid registered email address (Expected: Email is accepted)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const emailInput = page.getByTestId('login-email');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill('registered.user@example.com', { timeout: ACTION_TIMEOUT });
    await expect(emailInput).toHaveValue('registered.user@example.com', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter incorrect password (Expected: Password is masked)
    //
    const passwordInput = page.getByTestId('login-password');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill('IncorrectPassword123', { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Click Login button (Expected: Login fails with error message indicating invalid credentials)
    //
    const loginButton = page.getByTestId('login-submit');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const loginError = page.getByTestId('login-error');
    await expect(loginError).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});