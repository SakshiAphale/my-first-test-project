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
test.describe('Login Module Authentication @Sp07oacoy', () => {

  test('@auth MODULE-001: OTP sent to registered email for password recovery @Tyyahg5wk', async ({ page }) => {

    //
    // STEP 1: Enter registered email address
    //
    await page.goto('/password-recovery', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const emailInput = page.getByTestId('recovery-email');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });

    const registeredEmail = 'registered.user@example.com';
    await emailInput.fill(registeredEmail, { timeout: ACTION_TIMEOUT });

    //
    // STEP 2: Click Send OTP or Submit button
    //
    const sendOtpButton = page.getByTestId('send-otp-button');
    await sendOtpButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await sendOtpButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const successToast = page.getByTestId('otp-sent-success');
    await expect(successToast).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Check registered email inbox
    //
    const inboxItem = page.getByTestId('otp-email-received');
    await inboxItem.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(inboxItem).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});