import { BaseElement } from './base.element';

export class Button extends BaseElement {
    async isEnabled(): Promise<boolean> {
        return await this.locator.isEnabled();
    }
}
