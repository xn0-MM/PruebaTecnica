// src/agents/customer.agent.ts
import { BaseAgent } from './base.agent';

export interface ICustomerData {
    id: string;
    name: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export class CustomerAgent extends BaseAgent implements ICustomerData {
    name: string = '';
    gender: string = '';
    dateOfBirth: string = '';
    address: string = '';
    city: string = '';
    state: string = '';
    pin: string = '';
    phoneNumber: string = '';
    email: string = '';

    constructor(init?: Partial<ICustomerData>) {
        super(init);
        Object.assign(this, init);
    }

    getRole(): string {
        return 'Customer';
    }

    override toJSON(): ICustomerData {
        return {
            id: this.id,
            name: this.name,
            gender: this.gender,
            dateOfBirth: this.dateOfBirth,
            address: this.address,
            city: this.city,
            state: this.state,
            pin: this.pin,
            phoneNumber: this.phoneNumber,
            email: this.email,
            password: this.password,
        };
    }
}

