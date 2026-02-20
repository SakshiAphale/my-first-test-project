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
test.describe('Login Module Authentication @S9mtxh15r', () => {

  test('@auth MODULE-001: Forgot Password with unregistered email @Twlgxp4g6', async ({ page }) => {

    const suffix = Date.now().toString(36);
    const unregisteredEmail = 'unregistered+' + suffix + '@example.com';

    //
    // STEP 1: Navigate to password recovery page (Precondition)
    //
    await page.goto('/password-recovery', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Enter an email address that is not registered in the system (Email field accepts the input)
    //
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill(unregisteredEmail, { timeout: ACTION_TIMEOUT });
    await expect(emailInput).toHaveValue(unregisteredEmail, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Click Send OTP or Submit button (Appropriate error message displayed or generic success message for security)
    //
    const submitButton = page.getByTestId('send-otp-button');
    await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await submitButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const recoveryMessage = page.getByTestId('recovery-message');
    await recoveryMessage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(recoveryMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});