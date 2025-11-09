import fs from 'fs';
import path from 'path';
import { test as base } from '@playwright/test';
import { NavigationActions } from '@/actions/navigation.actions';
import { LoginActions } from '@/actions/login.actions';
import { ManagerActions } from '@/actions/manager.actions';
import { routes } from '@/data/routes';
import { ManagerAgent } from '@/model/agents/manager.agent';

export * from '@playwright/test';

type WorkerFixtures = {
    manager: ManagerAgent;
    workerStorageState: string;
};

export const test = base.extend<{}, WorkerFixtures>({
    manager: [
        async ({ }, use) => {
            const manager = ManagerAgent.getInstance();
            manager.init();
            await use(manager);
        },
        { scope: 'worker' },
    ],
    workerStorageState: [
        async ({ browser, manager }, use) => {
            const id = test.info().parallelIndex;
            const fileName = path.resolve(test.info().project.outputDir, `${id}.json`);

            if (fs.existsSync(fileName)) {
                await use(fileName);
                return;
            }

            const creds = manager.getCredentials();
            const page = await browser.newPage({ storageState: undefined });

            const navigationActions = new NavigationActions(page);
            const loginActions = new LoginActions(page);
            const managerActions = new ManagerActions(page);

            await navigationActions.goTo(routes.loginPage);
            await loginActions.login(creds);

            await managerActions.homePage.navBar.locator.waitFor({
                state: 'visible',
                timeout: 10000,
            });

            await page.context().storageState({ path: fileName });
            await page.close();

            await use(fileName);
        },
        { scope: 'worker' },
    ],
    storageState: ({ workerStorageState }, use) => use(workerStorageState),
});

