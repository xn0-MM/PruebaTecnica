import { Page } from '@playwright/test';
import { BasePage } from '@/model/pages/base.page';
import { Input } from '@/model/elements/input.element';
import { Button } from '@/model/elements/button.element';

export class CreateManagerPage extends BasePage {
    readonly emailTextInput: Input;
    readonly submitButton: Button;

    constructor(page: Page, url: string) {
        super(page, url);
        this.emailTextInput = new Input(this.page, this.page.getByRole('textbox'));
        this.submitButton = new Button(this.page, this.page.getByRole('button', { name: 'Submit' }));
    }
}
