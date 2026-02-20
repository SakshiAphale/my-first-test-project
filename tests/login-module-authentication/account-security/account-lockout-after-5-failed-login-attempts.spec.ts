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
test.describe('Login Module Authentication @Sdd8g87k3', () => {

  test('@auth @login @security @lockout MODULE-001: Account lockout after 5 failed login attempts @Tijvr156q', async ({ page }) => {

    const validEmail = 'locked.user@example.com';
    const correctPassword = 'CorrectPassword123';
    const incorrectPassword = 'WrongPassword123';

    //
    // STEP 1: Enter valid email address (email is accepted)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: ACTION_TIMEOUT });

    const emailInput = page.getByTestId('login-email');
    const passwordInput = page.getByTestId('login-password');
    const submitButton = page.getByTestId('login-submit');
    const errorMessage = page.getByTestId('login-error');
    const attemptCounter = page.getByTestId('attempt-counter');
    const lockoutMessage = page.getByTestId('lockout-message');

    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill(validEmail, { timeout: ACTION_TIMEOUT });
    await expect(emailInput).toHaveValue(validEmail, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter incorrect password and submit (attempt 1) - Error message displayed: Invalid credentials
    //
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(incorrectPassword, { timeout: ACTION_TIMEOUT });
    await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await submitButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: ACTION_TIMEOUT });
    await expect(errorMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(errorMessage).toHaveText(/Invalid credentials/i, { timeout: EXPECT_TIMEOUT });
    await expect(attemptCounter).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(attemptCounter).toHaveText(/1/i, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Repeat incorrect password submission (attempts 2-4) - Error messages displayed for each attempt, counter increments
    //
    for (let attempt = 2; attempt <= 4; attempt++) {
      await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
      await passwordInput.fill(incorrectPassword, { timeout: ACTION_TIMEOUT });
      await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
      await submitButton.click({ timeout: ACTION_TIMEOUT });
      await page.waitForLoadState('networkidle', { timeout: ACTION_TIMEOUT });
      await expect(errorMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });
      await expect(errorMessage).toHaveText(/Invalid credentials/i, { timeout: EXPECT_TIMEOUT });
      await expect(attemptCounter).toBeVisible({ timeout: EXPECT_TIMEOUT });
      await expect(attemptCounter).toHaveText(new RegExp(`${attempt}`), { timeout: EXPECT_TIMEOUT });
    }

    //
    // STEP 4: Enter incorrect password and submit (attempt 5) - Account is locked, lockout message displayed
    //
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(incorrectPassword, { timeout: ACTION_TIMEOUT });
    await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await submitButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: ACTION_TIMEOUT });
    await expect(lockoutMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(lockoutMessage).toHaveText(/account locked/i, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 5: Attempt to login with correct password - Login is rejected even with correct password, account locked message shown
    //
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(correctPassword, { timeout: ACTION_TIMEOUT });
    await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await submitButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: ACTION_TIMEOUT });
    await expect(lockoutMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(lockoutMessage).toHaveText(/account locked/i, { timeout: EXPECT_TIMEOUT });

  });

});