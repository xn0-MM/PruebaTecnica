import { Locator, Page } from '@playwright/test';
import { BaseActions } from './base.actions';
import { NavBarComponent } from '@/model/components/navbar.component';
import { HomePage } from '@/model/pages/home.page';
import { routes } from '@/data/routes';

export class NavigationActions extends BaseActions {
    readonly managerPage: HomePage;
    constructor(page: Page) {
        super(page);
        this.managerPage = new HomePage(this.page, routes.homePage);
    }

    async goTo(link?: string) {
        if (!routes.baseUrl) throw new Error('baseURL no está definida en routes');
        const url = link ? `${routes.baseUrl}${link}` : routes.baseUrl;
        await this.page.goto(url);
    }

    async goToByMenu(option: keyof NavBarComponent): Promise<void> {
        const navOption = this.managerPage.navBar[option];
        await (navOption as Locator).click();
    }
}
