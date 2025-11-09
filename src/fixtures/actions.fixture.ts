import { test as base } from './auth.fixture';
import { LoginActions } from '@/actions/login.actions';
import { NavigationActions } from '@/actions/navigation.actions';
import { CustomerActions } from '@/actions/customer.actions';
import { ManagerActions } from '@/actions/manager.actions';
import { ManagerAgent } from '@/model/agents/manager.agent';
import { IRoutes, routes } from '@/data/routes';
import { CustomerFactory } from '@/model/factories/customer.factory';

type ActionsFixtures = {
    loginActions: LoginActions;
    navigationActions: NavigationActions;
    customerActions: CustomerActions;
    registeredCustomerActions: CustomerActions;
    managerActions: ManagerActions;
    routes: IRoutes;
    manager: ManagerAgent;
    customerFactory: typeof CustomerFactory;
};

export const test = base.extend<ActionsFixtures>({
    loginActions: async ({ page }, use) => {
        await use(new LoginActions(page));
    },
    navigationActions: async ({ page }, use) => {
        await use(new NavigationActions(page));
    },
    customerActions: async ({ page }, use) => {
        await use(new CustomerActions(page));
    },
    managerActions: async ({ page }, use) => {
        await use(new ManagerActions(page));
    },
    // eslint-disable-next-line
    routes: async ({ }, use) => {
        await use(routes);
    },
    // eslint-disable-next-line
    customerFactory: async ({ }, use) => {
        await use(CustomerFactory);
    },
});

export { expect } from '@playwright/test';
