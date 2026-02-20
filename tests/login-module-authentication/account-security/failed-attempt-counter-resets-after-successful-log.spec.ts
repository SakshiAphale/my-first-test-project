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
test.describe('Login Module Authentication @Sqqi6j5se', () => {

  test('@auth MODULE-001: Failed attempt counter resets after successful login @Tlkfl5ich', async ({ page }) => {

    //
    // STEP 1: Enter valid email address
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const validEmail = 'user@example.com';
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill(validEmail, { timeout: ACTION_TIMEOUT });

    await expect(emailInput).toHaveValue(validEmail, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter correct password
    //
    const correctPassword = 'CorrectPassword123';
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(correctPassword, { timeout: ACTION_TIMEOUT });

    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Click Login button
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });

    await page.waitForURL(/\/dashboard/, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const dashboard = page.getByTestId('dashboard');
    await dashboard.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(dashboard).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Logout and attempt login with incorrect password
    //
    const logoutButton = page.getByTestId('logout-button');
    await logoutButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await logoutButton.click({ timeout: ACTION_TIMEOUT });

    await page.waitForURL(/\/login/, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const wrongPassword = 'WrongPassword123';
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill(validEmail, { timeout: ACTION_TIMEOUT });

    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(wrongPassword, { timeout: ACTION_TIMEOUT });

    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });

    const failedAttemptCounter = page.getByTestId('failed-attempt-counter');
    await failedAttemptCounter.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(failedAttemptCounter).toHaveText('1', { timeout: EXPECT_TIMEOUT });

  });

});