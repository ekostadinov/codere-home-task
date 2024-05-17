import { expect, Locator, Page, chromium } from "@playwright/test";
import { ProfileEnum } from "../data/profileEnum";

export class Profile {
  readonly page: Page;
  readonly navBarUserNameLabel: Locator;
  readonly logoutButton: Locator;
  readonly profileMenuBlock: string;



  constructor(page: Page) {
    this.page = page;
    this.navBarUserNameLabel = page.locator('ion-navbar').getByRole("button", { name: process.env.USERNAME!! });
    this.logoutButton = page.getByText(ProfileEnum.LOGOUT);
    this.profileMenuBlock = `div[class*='user-submenu']`;
  }

  async logoutSuccessfully() {
    try {
      await this.navBarUserNameLabel.click({force: true});
      await this.page.waitForSelector(this.profileMenuBlock, { timeout: 10000 });
      await this.logoutButton.click();
      await this.page.waitForLoadState("domcontentloaded");
    } catch (error) {
      console.error("An error occurred while user logout:", error);
    }
  }

}