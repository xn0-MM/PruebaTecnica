import { faker } from '@faker-js/faker';
import { CustomerAgent, ICustomerData } from '@/model/agents/customer.agent';
import { cleanSpecialCharacters } from '@/utils/strings.utils';


export class CustomerFactory {
    static valid(): CustomerAgent {
        const data: ICustomerData = {
            id: faker.string.uuid(),
            name: cleanSpecialCharacters(faker.person.firstName()),
            gender: faker.person.sexType(),
            dateOfBirth: faker.date.birthdate().toISOString().split('T')[0],
            address: cleanSpecialCharacters(faker.location.streetAddress()),
            city: faker.location.city(),
            state: faker.location.state(),
            pin: faker.number.int({ min: 111111, max: 999999 }).toString(),
            phoneNumber: faker.phone.number({ style: 'international' }),
            email: cleanSpecialCharacters(faker.internet.email({ provider: 'net.com' })),
            password: faker.internet.password(),
        };
        return new CustomerAgent(data);
    }


    static empty(): CustomerAgent {
        return new CustomerAgent();
    }

    static withFutureDate(): CustomerAgent {
        const data = this.valid();
        data.dateOfBirth = faker.date.future().toISOString().split('T')[0];
        return new CustomerAgent(data);
    }

    static excludingField(field: keyof ICustomerData): CustomerAgent {
        const data = this.valid();
        (data as any)[field] = '';
        return new CustomerAgent(data);
    }

    static withOverrides(overrides: Partial<ICustomerData>): CustomerAgent {
        const base = this.valid();
        Object.assign(base, overrides);
        return new CustomerAgent(base);
    }
}
