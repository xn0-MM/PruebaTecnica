import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export type INavBarOptions = {
    manager: Locator;
    newCustomer: Locator;
    editCustomer: Locator;
    deleteCustomer: Locator;
    newAccount: Locator;
    editAccount: Locator;
    deleteAccount: Locator;
    deposit: Locator;
    withdrawal: Locator;
    fundTransfer: Locator;
    changePassword: Locator;
    balanceEnquiry: Locator;
    miniStatement: Locator;
    customisedStatement: Locator;
    logout: Locator;
};

export class NavBarComponent extends BaseComponent {
    readonly manager: Locator;
    readonly newCustomer: Locator;
    readonly editCustomer: Locator;
    readonly deleteCustomer: Locator;
    readonly newAccount: Locator;
    readonly editAccount: Locator;
    readonly deleteAccount: Locator;
    readonly deposit: Locator;
    readonly withdrawal: Locator;
    readonly fundTransfer: Locator;
    readonly changePassword: Locator;
    readonly balanceEnquiry: Locator;
    readonly miniStatement: Locator;
    readonly customisedStatement: Locator;
    readonly logout: Locator;

    constructor(page: Page, locator: Locator) {
        super(page, locator);

        this.manager = this.locator.getByRole('link', { name: 'Manager' });
        this.newCustomer = this.locator.getByRole('link', { name: 'New Customer' });
        this.editCustomer = this.locator.getByRole('link', { name: 'Edit Customer' });
        this.deleteCustomer = this.locator.getByRole('link', { name: 'Delete Customer' });
        this.newAccount = this.locator.getByRole('link', { name: 'New Account' });
        this.editAccount = this.locator.getByRole('link', { name: 'Edit Account' });
        this.deleteAccount = this.locator.getByRole('link', { name: 'Delete Account' });
        this.deposit = this.locator.getByRole('link', { name: 'Deposit' });
        this.withdrawal = this.locator.getByRole('link', { name: 'Withdrawal' });
        this.fundTransfer = this.locator.getByRole('link', { name: 'Fund Transfer' });
        this.changePassword = this.locator.getByRole('link', { name: 'Change Password' });
        this.balanceEnquiry = this.locator.getByRole('link', { name: 'Balance Enquiry' });
        this.miniStatement = this.locator.getByRole('link', { name: 'Mini Statement' });
        this.customisedStatement = this.locator.getByRole('link', { name: 'Customised Statement' });
        this.logout = this.locator.getByRole('link', { name: 'Log out' });
    }
}
