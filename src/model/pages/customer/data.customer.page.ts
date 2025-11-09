import { Locator, Page } from '@playwright/test';
import { BasePage } from '@/model/pages/base.page';
import { Table } from '@/model/elements/table.element';

export class DataCustomerPage extends BasePage {
    readonly table: Table;
    readonly continueLink: Locator;

    constructor(page: Page, url: string) {
        super(page, url);
        this.table = new Table(this.page, this.page.locator('#customer'));
        this.continueLink = this.page.getByRole('link', { name: 'Continue' });
    }
}
