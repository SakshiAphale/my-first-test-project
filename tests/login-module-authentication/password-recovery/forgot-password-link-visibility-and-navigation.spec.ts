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
test.describe('Login Module Authentication @S1msicuz8', () => {

  test('@auth MODULE-001: Forgot Password link visibility and navigation @T9inactnv', async ({ page }) => {

    //
    // STEP 1: Navigate to login page and locate Forgot Password link
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const forgotPasswordLink = page.getByTestId('forgot-password-link');
    await forgotPasswordLink.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(forgotPasswordLink).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Click on the Forgot Password link
    //
    await forgotPasswordLink.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 3: Verify navigation to password recovery page with email input field
    //
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/password|recovery|forgot/, { timeout: ACTION_TIMEOUT });
    const recoveryEmailInput = page.getByTestId('recovery-email-input');
    await recoveryEmailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(recoveryEmailInput).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});