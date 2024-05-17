import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { correctLoginData } from "../data/loginData";
import { Profile } from "../pages/profile";

test.describe('Codere application - Logout tests', () => {
    let login: Login;
    let profile: Profile;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    profile = new Profile(page);
    await page.goto("/");
  });

  test.afterEach(async ({ page }) => {
    await page.context().close();
  });

  test('Verify user is successfully logout from application', async ({ page }) => {
    const correctCredentials = correctLoginData();
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(correctCredentials);
    await page.waitForLoadState("domcontentloaded");

    await expect(login.navBarUserNameLabel).toBeVisible({timeout: 10000});
    await profile.logoutSuccessfully();
    await expect(login.accessButton).toBeVisible({timeout: 10000});
  });
});