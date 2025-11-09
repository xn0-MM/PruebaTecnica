import { test as setup } from '@playwright/test';
import { Vault } from './src/utils/vault';
import { routes } from './src/data/routes';
import { cleanSpecialCharacters } from './src/utils/strings.utils';
import { faker } from '@faker-js/faker';
import { globalVars } from './global.vars'


setup('Create manager and save credentials', async ({ page }) => {
    await page.goto(routes.baseUrl);

    await page.getByRole('textbox').fill(cleanSpecialCharacters(faker.internet.email()));
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('table').waitFor({ state: 'visible', timeout: globalVars.timeout });

    const rows = await page.getByRole('table').locator('tr').all();
    const data: Record<string, string> = {};

    for (const row of rows) {
        const cells = await row.locator('td').all();
        if (cells.length === 2) {
            const key = (await cells[0].innerText()).trim();
            const value = (await cells[1].innerText()).trim();
            data[key] = value;
        }
    }

    const credentials = {
        id: data['User ID :'] || '',
        password: data['Password :'] || '',
    }

    Vault.set('managerCredentials', credentials);
});