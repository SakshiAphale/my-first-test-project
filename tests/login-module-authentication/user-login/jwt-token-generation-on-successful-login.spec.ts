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
test.describe('Login Module Authentication @Syd1zc1wp', () => {

  test('@auth MODULE-001: JWT token generation on successful login @Tl5bvwp2w', async ({ request }) => {

    const username = 'registered.user@example.com';
    const password = 'ValidPassword123';

    //
    // STEP 1: Send POST request to login API with valid credentials
    //
    const response = await request.post('/api/login', {
      data: { username, password },
      timeout: ACTION_TIMEOUT
    });

    //
    // STEP 2: Capture the response
    //
    const responseBody = await response.json();

    //
    // STEP 3: Validate JWT token structure
    //
    await expect(response.status(), { timeout: EXPECT_TIMEOUT }).toBe(200);
    const token = responseBody.token;
    await expect(token, { timeout: EXPECT_TIMEOUT }).toBeTruthy();
    const tokenParts = token.split('.');
    await expect(tokenParts.length, { timeout: EXPECT_TIMEOUT }).toBe(3);
    await expect(tokenParts[0], { timeout: EXPECT_TIMEOUT }).not.toEqual('');
    await expect(tokenParts[1], { timeout: EXPECT_TIMEOUT }).not.toEqual('');
    await expect(tokenParts[2], { timeout: EXPECT_TIMEOUT }).not.toEqual('');

  });

});