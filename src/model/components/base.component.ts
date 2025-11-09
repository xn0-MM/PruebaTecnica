import { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
    readonly page: Page;
    readonly locator: Locator;

    constructor(page: Page, locator: Locator) {
        this.page = page;
        this.locator = locator;
    }
}
