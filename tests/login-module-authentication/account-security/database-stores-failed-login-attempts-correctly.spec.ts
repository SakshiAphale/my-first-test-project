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
test.describe('Login Module Authentication @Sw2bfwmod', () => {

  test('@auth MODULE-001: Database stores failed login attempts correctly @Tze3xbyjq', async ({ page }) => {

    //
    // STEP 1: Query database for user failed attempt count
    //
    await page.goto('/admin/users', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const failedAttemptCount = page.getByTestId('failed-attempt-count');
    await failedAttemptCount.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(failedAttemptCount).toHaveText('0', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Attempt login with incorrect password
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const usernameInput = page.getByTestId('login-username');
    await usernameInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await usernameInput.fill('registered.user@example.com', { timeout: ACTION_TIMEOUT });

    const passwordInput = page.getByTestId('login-password');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill('WrongPassword123!', { timeout: ACTION_TIMEOUT });

    const submitButton = page.getByTestId('login-submit');
    await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await submitButton.click({ timeout: ACTION_TIMEOUT });

    const loginErrorToast = page.getByTestId('toast-error');
    await loginErrorToast.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginErrorToast).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Query database again for updated count
    //
    await page.goto('/admin/users', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const failedAttemptCountUpdated = page.getByTestId('failed-attempt-count');
    await failedAttemptCountUpdated.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(failedAttemptCountUpdated).toHaveText('1', { timeout: EXPECT_TIMEOUT });

  });

});