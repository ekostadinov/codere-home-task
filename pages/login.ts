import { expect, Locator, Page } from "@playwright/test";
import 'dotenv/config';

export interface LoginData {
    username: string;
    password: string;
  }

export class Login {
  readonly page: Page;
  readonly accessButton: Locator;
  readonly userNameInputField: string;
  readonly passwordInputField: string;
  readonly submitLoginButton: string;
  readonly cookiesDialogPopup: string;
  readonly acceptCookiesButton: Locator;
  readonly navBarUserNameLabel: Locator;
  readonly loginFormDialog: Locator;
  readonly loginErrorAlertDialog: string;
  readonly loginErrorAlertDialogHeader: string;
  readonly loginErrorAlertDialogMessage: string;
  readonly cookiesConsentDialog: Locator;
  readonly showPasswordButton: string;
  readonly hidePasswordButton: string;


  constructor(page: Page) {
    this.page = page;
    this.accessButton = page.getByRole('button', { name: "Acceder" });
    this.cookiesDialogPopup = `ion-alert[role='dialog'][class*=alertcookies]`;
    this.acceptCookiesButton = page.getByRole('button', { name: 'Aceptar' });
    this.userNameInputField = `ion-input[name='username'] input`,
    this.passwordInputField = `ion-input[name='password'] input`;
    this.submitLoginButton = `button[type='submit'][id='btnaccess']`;
    this.navBarUserNameLabel = page.locator('ion-navbar').getByRole("button", { name: process.env.USERNAME!! });
    this.loginFormDialog = page.locator('login-page');
    this.loginErrorAlertDialog = `ion-alert[role='dialog'][class='alert-md']`;
    this.loginErrorAlertDialogHeader = `ion-alert[role='dialog'] [id*='alert-hdr']`;
    this.loginErrorAlertDialogMessage = `ion-alert[role='dialog'] [id*='alert-msg']`;
    this.cookiesConsentDialog = page.locator('cookies-consent-page');
    this.showPasswordButton = `ion-icon[id='viewPass']`;
    this.hidePasswordButton = `ion-icon[id='noviewPass'] ion-icon[ios="ios-eye-off"]`;
  }

  async acceptAllCookies() {
    try {
      await this.page.waitForSelector(this.cookiesDialogPopup, { timeout: 15000 });
      await this.acceptCookiesButton.click();
    } catch (error) {
      console.error("An error occurred while accepting all cookies:", error);
    }
  }

  async verifyCookiesConsentDialog() { 
    try {
      expect(this.cookiesConsentDialog).toBeVisible( { timeout: 15000 });
    } catch (error) {
      console.error("An error occurred while verifying cookies consent dialog:", error);
    }
  }

  async openLoginForm() {
    await this.accessButton.click();
    expect(this.loginFormDialog).toBeVisible({ timeout: 10000 });
  }

  async fillLoginForm(loginData: LoginData, shouldSubmit: boolean = true) {
    try {
      await this.page.waitForSelector(this.userNameInputField);
      await this.page.locator(this.userNameInputField).pressSequentially(loginData.username, { delay: 100 });
      await this.page.waitForSelector(this.passwordInputField);
      await this.page.locator(this.passwordInputField).getAttribute('value');
      await this.page.locator(this.passwordInputField).pressSequentially(loginData.password, { delay: 100 });
      if (shouldSubmit) {
      await this.page.locator(this.submitLoginButton).click();
      }
    } catch (error) {
      console.error("An error occurred while filling the login form:", error);
    }
  }

  async verifyLoginErrorAlertDetails(alertHeader: string, alertDescription: string) {
    await this.page.waitForSelector(this.loginErrorAlertDialog, { timeout: 15000 });
    const actualAlertHeader = await this.page.locator(this.loginErrorAlertDialogHeader).textContent();
    const actualAlertDescription = await this.page.locator(this.loginErrorAlertDialogMessage).textContent();
    expect(actualAlertHeader).toBe(alertHeader);
    expect(actualAlertDescription).toBe(alertDescription);
  }
}