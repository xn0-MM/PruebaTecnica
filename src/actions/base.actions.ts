import { Page } from '@playwright/test';

export abstract class BaseActions {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getDialogMessage(timeout = 5000): Promise<string> {
        const dialog = await this.page.waitForEvent('dialog', { timeout });
        const message = dialog.message();
        await dialog.accept();
        return message;
    }
}
