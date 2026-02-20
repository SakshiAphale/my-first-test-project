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
test.describe('Login Module Authentication @S9853cf6o', () => {

  test('@auth MODULE-001: Email field accepts valid email format @Tnlaatijo', async ({ page }) => {

    //
    // STEP 1: Navigate (use relative URL only)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    //
    // STEP 2: Enter valid email format "user@domain.com"
    //
    const emailInput = page.getByTestId('email-input');
    await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await emailInput.fill('user@domain.com', { timeout: ACTION_TIMEOUT });

    //
    // STEP 3: Verify no validation error for "user@domain.com"
    //
    const emailError = page.getByTestId('email-error');
    await expect(emailError).toBeHidden({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Enter valid email format "user.name@subdomain.domain.org"
    //
    await emailInput.fill('user.name@subdomain.domain.org', { timeout: ACTION_TIMEOUT });

    //
    // STEP 5: Verify no validation error for "user.name@subdomain.domain.org"
    //
    await expect(emailError).toBeHidden({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 6: Enter valid email format "user+tag@domain.co.uk"
    //
    await emailInput.fill('user+tag@domain.co.uk', { timeout: ACTION_TIMEOUT });

    //
    // STEP 7: Verify no validation error for "user+tag@domain.co.uk"
    //
    await expect(emailError).toBeHidden({ timeout: EXPECT_TIMEOUT });

  });

});