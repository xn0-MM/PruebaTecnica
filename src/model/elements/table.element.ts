import { Locator, Page } from '@playwright/test';
import { BaseElement } from './base.element';
import { ICustomerData } from '../agents/customer.agent';
import { CustomerDataMapper } from '@/utils/data.mapper';

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

    async getRows(): Promise<Locator[]> {
        return await this.rows.all();
    }

    async getHeaderMessage(): Promise<string> {
        const headerCell = this.thead
        return (await headerCell.innerText()).trim();
    }

    private async getRawTableData(): Promise<string[][]> {
        await this.waitForVisible();

        const rows = await this.getRows()
        const rawData: string[][] = [];

        for (const row of rows) {
            const cells = await row.locator('td').all();
            const values = await Promise.all(cells.map(cell => cell.innerText()));
            rawData.push(values.map(v => v.trim()));
        }

        return rawData;
    }

    async getTableData(): Promise<ICustomerData> {
        const data = await this.getRawTableData();
        return CustomerDataMapper.getMappedData(data)
    }
}
