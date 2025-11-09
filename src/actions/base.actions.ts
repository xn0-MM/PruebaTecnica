import { Page } from '@playwright/test';

export abstract class BaseActions {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
