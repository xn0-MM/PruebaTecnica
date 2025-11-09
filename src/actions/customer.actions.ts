import { Page } from '@playwright/test';
import { NewCustomerPage } from '@/model/pages/customer/new.customer.page';
import { BaseActions } from './base.actions';
import { DataCustomerPage } from '@/model/pages/customer/data.customer.page';
import { routes } from '@/data/routes';
import { ICustomerData } from '@/model/agents/customer.agent';


export class CustomerActions extends BaseActions {
    readonly newCustomerPage: NewCustomerPage;
    readonly dataCustomerPage: DataCustomerPage;

    constructor(page: Page) {
        super(page);
        this.newCustomerPage = new NewCustomerPage(page, routes.newCustomerPage);
        this.dataCustomerPage = new DataCustomerPage(page, '');
    }

    async createCustomer(customer: ICustomerData) {
        await this.fillForm(customer);
        await this.submitForm();
    }

    async fillForm(data: ICustomerData) {
        const f = this.newCustomerPage.form;

        if (data.gender === 'male') await f.maleRadio.select();
        else if (data.gender === 'female') await f.femaleRadio.select();

        for (const { field, input } of this.newCustomerPage.getFormInputs()) {
            const value = data[field as keyof ICustomerData];

            if (value && value.toString().trim() !== '') {
                await input.fill(value);
            } else {
                await input.click();
                await input.locator.blur();
            }

        }
    }

    async setFieldValue(field: keyof ICustomerData, value: string) {
        const match = this.newCustomerPage.getFormInputs().find(i => i.field === field);
        if (!match) throw new Error(`Field ${field} not found in the form inputs.`);

        await match.input.fill(value);
    }

    async getSuccessMesage(): Promise<string> {
        const message = await this.dataCustomerPage.table.getHeaderMessage();
        return message;
    }

    async getErrorMessage(field: keyof ICustomerData): Promise<string> {
        const match = this.newCustomerPage.getFormInputs().find(i => i.field === field);
        if (!match) throw new Error(`Field ${field} not found in the form inputs.`);

        const { input } = match;
        const errorMessage = input.locator.locator('+ label');

        if (!(await errorMessage.isVisible())) throw new Error(`No se muestra el mensaje de error para el campo${field}`);

        const text = await errorMessage.innerText();
        return text.trim();
    }

    async getDialogMessage(): Promise<string> {
        return new Promise((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });
    }

    async getFormData(): Promise<ICustomerData> {
        const name = await this.newCustomerPage.form.nameInput.getValue();

        const maleChecked = await this.newCustomerPage.form.maleRadio.isChecked();
        const femaleChecked = await this.newCustomerPage.form.femaleRadio.isChecked();
        const gender = maleChecked ? 'male' : femaleChecked ? 'female' : '';

        const dateOfBirth = await this.newCustomerPage.form.dateOfBirthInput.getValue();
        const address = await this.newCustomerPage.form.addressInput.getValue();
        const city = await this.newCustomerPage.form.cityInput.getValue();
        const state = await this.newCustomerPage.form.stateInput.getValue();
        const pin = await this.newCustomerPage.form.pinInput.getValue();
        const phoneNumber = await this.newCustomerPage.form.phoneNumberInput.getValue();
        const email = await this.newCustomerPage.form.emailInput.getValue();
        const password = await this.newCustomerPage.form.passwordInput.getValue();

        return {
            id: '',
            name,
            dateOfBirth,
            gender,
            address,
            city,
            state,
            pin,
            phoneNumber,
            email,
            password,
        };
    }
    async getRegisteredFormData(customer: ICustomerData): Promise<ICustomerData> {
        const entries = await this.dataCustomerPage.table.getTableData();

        const customerData: ICustomerData = {
            id: entries['Customer ID'],
            name: entries['Customer Name'] ?? '',
            gender: entries['Gender'] ?? '',
            dateOfBirth: entries['Birthdate'] ?? '',
            address: entries['Address'] ?? '',
            city: entries['City'] ?? '',
            state: entries['State'] ?? '',
            pin: entries['Pin'] ?? '',
            phoneNumber: entries['Mobile No.'] ?? '',
            email: entries['Email'] ?? '',
            password: customer.password,
        };
        return customerData;
    }

    async submitForm() {
        await this.newCustomerPage.submitButton.waitForVisible();
        await this.newCustomerPage.submitButton.click();
    }

    async resetForm() {
        await this.newCustomerPage.resetButton.click();
    }

    async continue() {
        await this.dataCustomerPage.continueLink.click();
    }
}
