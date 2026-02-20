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
test.describe('Login Module Authentication @Spqgcf4wg', () => {

  test('@auth MODULE-001: Login attempt on locked account displays appropriate message @T6ubm5dqc', async ({ page }) => {

    const lockedEmail = 'locked.user@example.com';
    const correctPassword = 'CorrectPassword123';

    //
    // STEP 1: Navigate to login page
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const loginForm = page.getByTestId('login-form');
    await loginForm.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginForm).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter locked account email
    //
    const emailInput = page.getByTestId('login-email');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill(lockedEmail, { timeout: ACTION_TIMEOUT });
    await expect(emailInput).toHaveValue(lockedEmail, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Enter correct password
    //
    const passwordInput = page.getByTestId('login-password');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(correctPassword, { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Click Login button
    //
    const loginButton = page.getByTestId('login-submit');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 5: Verify lockout message displayed and instructions visible
    //
    const lockoutMessage = page.getByTestId('lockout-message');
    await lockoutMessage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(lockoutMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});