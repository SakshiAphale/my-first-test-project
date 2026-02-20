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
test.describe('Login Module Authentication @Shnpxh8u3', () => {

  test('@auth @login @security @ui Password field masking verification @T2fb02llu', async ({ page }) => {

    const passwordValue = "SecurePass123!";

    //
    // STEP 1: Navigate to login page (precondition)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Click on the password input field
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 3: Verify password field is focused
    //
    await expect(passwordInput).toBeFocused({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Type a password string
    //
    await passwordInput.fill(passwordValue, { timeout: ACTION_TIMEOUT });

    //
    // STEP 5: Observe the displayed characters are masked
    //
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

  });

});