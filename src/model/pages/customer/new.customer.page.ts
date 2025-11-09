import { Locator, Page } from '@playwright/test';
import { Button } from '@/model/elements/button.element';
import { Input as TextInput } from '../../elements/input.element';
import { BasePage } from '@/model/pages/base.page';
import { RadioButton } from '@/model/elements/radio.button.element';

export class NewCustomerPage extends BasePage {
    readonly form: {
        readonly nameInput: TextInput;
        readonly maleRadio: RadioButton;
        readonly femaleRadio: RadioButton;
        readonly dateOfBirthInput: TextInput;
        readonly addressInput: TextInput;
        readonly cityInput: TextInput;
        readonly stateInput: TextInput;
        readonly pinInput: TextInput;
        readonly phoneNumberInput: TextInput;
        readonly emailInput: TextInput;
        readonly passwordInput: TextInput;
    };

    readonly submitButton: Button;
    readonly resetButton: Button;

    constructor(page: Page, url: string) {
        super(page, url);
        this.form = {
            nameInput: new TextInput(page, this.page.locator('input[name="name"]')),
            maleRadio: new RadioButton(page, this.page.getByRole('radio').first()),
            femaleRadio: new RadioButton(page, this.page.getByRole('radio').nth(1)),
            dateOfBirthInput: new TextInput(page, this.page.locator('#dob')),
            addressInput: new TextInput(page, this.page.locator('textarea[name="addr"]')),
            cityInput: new TextInput(page, this.page.locator('input[name="city"]')),
            stateInput: new TextInput(page, this.page.locator('input[name="state"]')),
            pinInput: new TextInput(page, this.page.locator('input[name="pinno"]')),
            phoneNumberInput: new TextInput(page, this.page.locator('input[name="telephoneno"]')),
            emailInput: new TextInput(page, this.page.locator('input[name="emailid"]')),
            passwordInput: new TextInput(page, this.page.locator('input[name="password"]'))
        }

        this.submitButton = new Button(page, this.page.getByRole('button', { name: 'Submit' }));
        this.resetButton = new Button(page, this.page.getByRole('button', { name: 'Reset' }));
    }

    getFormInputs() {
        const f = this.form;
        return [
            { field: 'name', input: f.nameInput },
            { field: 'dateOfBirth', input: f.dateOfBirthInput },
            { field: 'address', input: f.addressInput },
            { field: 'city', input: f.cityInput },
            { field: 'state', input: f.stateInput },
            { field: 'pin', input: f.pinInput },
            { field: 'phoneNumber', input: f.phoneNumberInput },
            { field: 'email', input: f.emailInput },
            { field: 'password', input: f.passwordInput },
        ] as const;
    }
}
