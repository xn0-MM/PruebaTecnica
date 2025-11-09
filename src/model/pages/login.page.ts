import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Input } from '@/model/elements/input.element';
import { Button } from '@/model/elements/button.element';

export class LoginPage extends BasePage {
    readonly userTextInput: Input;
    readonly passwordInput: Input;
    readonly loginButton: Button;
    readonly resetButton: Button;

    constructor(page: Page, url: string) {
        super(page, url);
        this.userTextInput = new Input(page, this.page.locator('input[name="uid"]'));
        this.passwordInput = new Input(page, this.page.locator('input[name="password"]'));
        this.loginButton = new Button(page, this.page.getByRole('button', { name: 'LOGIN' }));
        this.resetButton = new Button(page, this.page.getByRole('button', { name: 'RESET' }));
    }
}
