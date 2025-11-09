import { Locator, Page } from '@playwright/test';
import { BaseElement } from './base.element';

export class Table extends BaseElement {

    readonly thead: Locator;
    readonly tbody: Locator;
    readonly rows: Locator;
    readonly cells: Locator;

    constructor(page: Page, locator: Locator) {
        super(page, locator);
        this.tbody = this.locator.locator('tbody');
        this.thead = this.tbody.locator('tr').first();
        this.rows = this.tbody.locator('tr');
        this.cells = this.rows.locator('td');
    }

    async getCell(rowIndex: number, cellIndex: number): Promise<Locator> {
        return this.rows.nth(rowIndex).locator('td').nth(cellIndex);
    }

    async getRow(rowIndex: number): Promise<Locator> {
        return this.rows.nth(rowIndex);
    }

    async getHeaderMessage(): Promise<string> {
        const headerCell = this.thead.locator('th').first();
        return (await headerCell.innerText()).trim();
    }

    async getTableData() {
        await this.waitForVisible();
        const rows = await this.rows.all();
        const entries: Record<string, string> = {};

        for (const row of rows) {
            const cells = await row.locator('td').all();
            if (cells.length === 2) {
                const key = (await cells[0].innerText()).trim();
                const value = (await cells[1].innerText()).trim();
                entries[key] = value;
            }
        }

        return entries;
    }
}
