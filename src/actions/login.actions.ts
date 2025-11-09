import { Page } from '@playwright/test';
import { LoginPage } from '@/model/pages/login.page';
import { BaseActions } from './base.actions';
import { routes } from '@/data/routes';
import { ICredentials } from '@/model/agents/base.agent';

export class LoginActions extends BaseActions {
    readonly loginPage: LoginPage;

    constructor(page: Page) {
        super(page);
        this.loginPage = new LoginPage(page, routes.loginPage);
    }

    async getManagerCredentials(): Promise<ICredentials> {
        return {
            id: await this.loginPage.userTextInput.getValue(),
            password: await this.loginPage.passwordInput.getValue(),
        };
    }

    async fillForm(creds: ICredentials): Promise<void> {
        await this.loginPage.userTextInput.fill(creds.id);
        await this.loginPage.passwordInput.fill(creds.password);
    }

    async login(creds: ICredentials): Promise<void> {
        await this.fillForm(creds);
        await this.clickLoginButton();
    }

    async clickLoginButton(): Promise<void> {
        await this.loginPage.loginButton.click();
    }
    async clickResetButton(): Promise<void> {
        await this.loginPage.resetButton.click();
    }
}
