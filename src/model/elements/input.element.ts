import { BaseElement } from './base.element';

export class Input extends BaseElement {
    async fill(value: string | number): Promise<void> {
        await this.waitForVisible()
        await this.locator.fill(value.toString());
        await this.locator.blur();
    }

    async clear(): Promise<void> {
        await this.locator.clear();
    }

    async getValue(): Promise<string> {
        return await this.locator.inputValue();
    }
}
