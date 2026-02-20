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
test.describe('Login Module Authentication @S3tvbidr8', () => {

  test('@auth MODULE-001: Email field validation for invalid format @Tpss21hi3', async ({ page }) => {

    //
    // STEP 1: Navigate (use relative URL only)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Enter invalid email format (e.g., "userwithoutat.com")
    //
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill('userwithoutat.com', { timeout: ACTION_TIMEOUT });

    //
    // STEP 3: Click outside the email field or attempt to submit
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 4: Verify validation error message is displayed and submission blocked
    //
    const emailError = page.getByTestId('email-error');
    await expect(emailError).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const loginButton = page.getByTestId('login-submit');
    await expect(loginButton).toBeDisabled({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 5: Enter another invalid format (e.g., "user@")
    //
    await emailInput.fill('user@', { timeout: ACTION_TIMEOUT });
    await passwordInput.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 6: Verify validation error shown for "user@"
    //
    await expect(emailError).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 7: Enter another invalid format (e.g., "@domain.com")
    //
    await emailInput.fill('@domain.com', { timeout: ACTION_TIMEOUT });
    await passwordInput.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 8: Verify validation error shown for "@domain.com"
    //
    await expect(emailError).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});