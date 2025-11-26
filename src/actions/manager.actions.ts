import { Page } from '@playwright/test';
import { BaseActions } from './base.actions';
import { HomePage as HomePage } from '@/model/pages/home.page';
import { CreateManagerPage } from '@/model/pages/manager/create.manager.page';
import { DataManagerPage } from '@/model/pages/manager/data.manager.page';
import { routes } from '@/data/routes';
import { cleanSpecialCharacters } from '@/utils/strings.utils';
import { faker } from '@faker-js/faker';
import { ICredentials } from '@/model/agents/base.agent';

export class ManagerActions extends BaseActions {
    readonly homePage: HomePage;
    readonly createManagerPage: CreateManagerPage;
    readonly dataManagerPage: DataManagerPage;

    constructor(page: Page) {
        super(page);
        this.homePage = new HomePage(page, routes.homePage);
        this.createManagerPage = new CreateManagerPage(page, routes.baseUrl);
        this.dataManagerPage = new DataManagerPage(page, '');
    }

    async createManager() {
        await this.fillEmail();
        await this.clickSubmit();
        await this.dataManagerPage.table.waitForVisible();
        return await this.getUserAndPassword();
    }

    async fillEmail() {
        await this.createManagerPage.emailTextInput.waitForVisible(5000);
        await this.createManagerPage.emailTextInput.fill(cleanSpecialCharacters(faker.internet.email()));
    }

    async clickSubmit() {
        await this.createManagerPage.submitButton.waitForVisible(5000);
        await this.createManagerPage.submitButton.click();
    }

    async getUserAndPassword(): Promise<ICredentials> {
        return await this.dataManagerPage.table.getTableData();
    }
}

