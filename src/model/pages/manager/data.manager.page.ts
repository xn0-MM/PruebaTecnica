import { Page } from '@playwright/test';
import { BasePage } from '@/model/pages/base.page';
import { Table } from '@/model/elements/table.element';

export class DataManagerPage extends BasePage {
    readonly table: Table;

    constructor(page: Page, url: string) {
        super(page, url);
        this.table = new Table(this.page, this.page.getByRole('table'));
    }
}
