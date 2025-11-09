import { Button } from './button.element';

export class RadioButton extends Button {
    async isChecked(): Promise<boolean> {
        return await this.locator.isChecked();
    }

    async select(): Promise<void> {
        if (!(await this.isChecked())) {
            await this.click();
        }
    }
}
