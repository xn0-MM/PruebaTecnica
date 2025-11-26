import { ICustomerData } from "@/model/agents/customer.agent";

export class CustomerDataMapper {

    static getMappedData(rawRows: string[][]): ICustomerData {
        const validRows = rawRows.filter(row => row.length === 2);

        const entries: Record<string, string> = Object.fromEntries(validRows);

        const fieldMap: Record<keyof ICustomerData, string> = {
            id: 'Customer ID',
            name: 'Customer Name',
            gender: 'Gender',
            dateOfBirth: 'Birthdate',
            address: 'Address',
            city: 'City',
            state: 'State',
            pin: 'Pin',
            phoneNumber: 'Mobile No.',
            email: 'Email',
            password: 'Password',
        };

        const customerData = Object.fromEntries(
            Object.entries(fieldMap).map(([key, label]) => [key, entries[label] ?? ''])
        ) as unknown as ICustomerData;

        return customerData;
    }
}
