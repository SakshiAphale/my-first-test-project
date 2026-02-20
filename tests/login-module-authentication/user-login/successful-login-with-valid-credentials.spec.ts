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
test.describe('Login Module Authentication @Skopbcta3', () => {

  test('@auth MODULE-001: Successful login with valid credentials @Tunam1kwk', async ({ page }) => {

    const validEmail = 'user@example.com';
    const validPassword = 'ValidPassword123';

    //
    // STEP 1: Navigate to login page (precondition)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Enter valid email address in email field (Email field accepts valid format)
    //
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill(validEmail, { timeout: ACTION_TIMEOUT });
    await expect(emailInput).toHaveValue(validEmail, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Enter correct password in password field (Password is masked)
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(validPassword, { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Click the Login button
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    const authResponsePromise = page.waitForResponse(
      response => response.url().includes('/auth') && response.status() === 200,
      { timeout: ACTION_TIMEOUT }
    );
    await loginButton.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 5: Wait for authentication response (JWT token generated and stored)
    //
    await authResponsePromise;
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/dashboard/, { timeout: ACTION_TIMEOUT });

    //
    // STEP 6: Verify redirect to dashboard and token storage (User redirected to dashboard)
    //
    const dashboardRoot = page.getByTestId('dashboard-page');
    await dashboardRoot.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(dashboardRoot).toBeVisible({ timeout: EXPECT_TIMEOUT });

    await expect.poll(
      async () => await page.evaluate(() => localStorage.getItem('jwtToken')),
      { timeout: EXPECT_TIMEOUT }
    ).not.toBeNull();

  });

});