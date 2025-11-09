import { Page, Locator } from '@playwright/test';
import { globalVars } from '../../../global.vars';

export abstract class BaseElement {
    readonly page: Page;
    readonly locator: Locator;

    constructor(page: Page, parent: Locator) {
        this.page = page;
        this.locator = parent;
    }

    async click(timeout = globalVars.timeout) {
        await this.locator.scrollIntoViewIfNeeded();
        await this.locator.click({ timeout: timeout });
    }

    async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    async waitForVisible(timeout = globalVars.timeout) {
        await this.locator.waitFor({ state: 'visible', timeout: timeout });
    }
}
