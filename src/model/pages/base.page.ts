import { Locator, Page } from '@playwright/test';
import { NavBarComponent } from '@/model/components/navbar.component';

export abstract class BasePage {
    readonly page: Page;
    readonly url: string;
    readonly title: Locator;
    readonly header: Locator;
    readonly footer: Locator;
    readonly navBar: NavBarComponent;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
        this.title = this.page.getByRole('heading').first();
        this.header = this.page.locator('header');
        this.footer = this.page.locator('footer');
        this.navBar = new NavBarComponent(this.page, this.page.locator('.menusubnav'));
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}
