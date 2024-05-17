import { test, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { correctLoginData, correctPasswordWrongUsername, correctUsernameWrongPassword, incorrectLoginData } from "../data/loginData";
import { LoginAlertEnum } from "../data/loginAlertEnum";

test.describe('Codere application - Login tests', () => {
    let login: Login;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await page.goto("/");
    // TODO: May add explicit verification for home page is opened 
  });

  test.afterEach(async ({ page }) => {
    await page.context().close();
  });

  test('Verify user is successfully logged in with correct credentials', async ({ page }) => {
    const correctCredentials = correctLoginData();
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(correctCredentials);
    await page.waitForLoadState("domcontentloaded");

    await expect(login.navBarUserNameLabel).toBeVisible({timeout: 10000});
  });

  test('Verify user can not login with incorrect credentials', async ({ }) => {
    const wrongPasswordCredentials = incorrectLoginData();
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(wrongPasswordCredentials);
    await login.verifyLoginErrorAlertDetails(LoginAlertEnum.LOGIN_ERROR_HEADER, LoginAlertEnum.LOGIN_ERROR_MESSAGE);
    
    await expect(login.navBarUserNameLabel).toBeHidden();
  });

  test('Verify user can not login with correct username and incorrect password', async ({ }) => {
    const wrongPasswordCredentials = correctUsernameWrongPassword();
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(wrongPasswordCredentials);
    await login.verifyLoginErrorAlertDetails(LoginAlertEnum.LOGIN_ERROR_HEADER, LoginAlertEnum.LOGIN_ERROR_MESSAGE);
    
    await expect(login.navBarUserNameLabel).toBeHidden();
  });

  test('Verify user can not login with incorrect username and correct password', async ({ }) => {
    const wrongPasswordCredentials = correctPasswordWrongUsername();
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(wrongPasswordCredentials);
    await login.verifyLoginErrorAlertDetails(LoginAlertEnum.LOGIN_ERROR_HEADER, LoginAlertEnum.LOGIN_ERROR_MESSAGE);
    
    await expect(login.navBarUserNameLabel).toBeHidden();
  });

  test(`Verify: 'Mandatory fields' login alert when try to login with both empty username and empty password`, async ({ }) => {
    const emptyCredentials = { username: '', password: '' };
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(emptyCredentials);
    await login.verifyLoginErrorAlertDetails(LoginAlertEnum.LOGIN_HEADER, LoginAlertEnum.MANDATORY_FIELDS_MESSAGE);
    
    await expect(login.navBarUserNameLabel).toBeHidden();
  });

  test(`Verify: 'Mandatory fields' login alert when try to login with empty username`, async ({ }) => {
    const emptyCredentials = correctPasswordWrongUsername();
    emptyCredentials.username = '';
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(emptyCredentials);
    await login.verifyLoginErrorAlertDetails(LoginAlertEnum.LOGIN_HEADER, LoginAlertEnum.MANDATORY_FIELDS_MESSAGE);
   
    await expect(login.navBarUserNameLabel).toBeHidden();
  });

  test('Verify login alert when try to login with empty password', async ({ }) => {
    const emptyCredentials = correctUsernameWrongPassword();
    emptyCredentials.password = '';
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(emptyCredentials);
    await login.verifyLoginErrorAlertDetails(LoginAlertEnum.LOGIN_HEADER, LoginAlertEnum.MANDATORY_FIELDS_MESSAGE);
    
    await expect(login.navBarUserNameLabel).toBeHidden();
  });

  test('Verify cookies consent dialog is displayed log try to login without accept cookies', async ({ }) => {
    await login.accessButton.click();
    await login.verifyCookiesConsentDialog();
  });

  test('Verify password value is hidden when is entered', async ({ }) => {
    const userCredentials = incorrectLoginData();
    await login.acceptAllCookies();
    await login.openLoginForm();
    await login.fillLoginForm(userCredentials, false);
    
    expect(login.page.locator(login.showPasswordButton)).toBeVisible();
    expect(login.page.locator(login.passwordInputField)).toHaveAttribute('type', 'password');
  });
});