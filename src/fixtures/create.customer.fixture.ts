import { ICustomerData } from '@/model/agents/customer.agent';
import { test as base } from './actions.fixture';


type CreatedUserFixture = {
    createdUser: ICustomerData
}

export const test = base.extend<CreatedUserFixture>({
    createdUser: async ({ navigationActions, routes, customerFactory, customerActions }, use) => {
        const data = customerFactory.valid().toJSON();

        await navigationActions.goTo(routes.newCustomerPage);
        await customerActions.createCustomer(data);

        await use(data);
    },
})