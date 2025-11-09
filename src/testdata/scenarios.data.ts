import { ICustomerData } from "@/model/agents/customer.agent";

interface IScenario {
    field: keyof ICustomerData;
    expectedMessage: string;
    input: string;
}

export const blankFieldScenarios: IScenario[] = [
    { field: 'name', expectedMessage: 'Customer name must not be blank', input: '' },
    { field: 'dateOfBirth', expectedMessage: 'Date Field must not be blank', input: '' },
    { field: 'address', expectedMessage: 'Address Field must not be blank', input: '' },
    { field: 'city', expectedMessage: 'City Field must not be blank', input: '' },
    { field: 'state', expectedMessage: 'State must not be blank', input: '' },
    { field: 'pin', expectedMessage: 'PIN Code must not be blank', input: '' },
    { field: 'phoneNumber', expectedMessage: 'Mobile no must not be blank', input: '' },
    { field: 'email', expectedMessage: 'Email-ID must not be blank', input: '' },
    { field: 'password', expectedMessage: 'Password must not be blank', input: '' },
];

export const formatScenarios: IScenario[] = [
    { field: 'email', expectedMessage: 'Email-ID is not valid', input: 'johndoe' },
    { field: 'email', expectedMessage: 'Email-ID is not valid', input: 'john@doe' },
    { field: 'email', expectedMessage: 'Email-ID is not valid', input: 'john.com' },
    { field: 'email', expectedMessage: 'Email-ID is not valid', input: 'StevenMaclister@microsoftamazongoogle.com' },
    { field: 'name', expectedMessage: 'Special characters are not allowed', input: '.?/)' },
    { field: 'name', expectedMessage: 'Numbers are not allowed', input: '1234' },
    // { field: 'dateOfBirth', expectedMessage: 'Special characters are not allowed', input: '.?/)' },
    { field: 'address', expectedMessage: 'Special characters are not allowed', input: '.?/)' },
    { field: 'city', expectedMessage: 'Special characters are not allowed', input: '.?/)' },
    { field: 'city', expectedMessage: 'Numbers are not allowed', input: '1234' },
    { field: 'state', expectedMessage: 'Special characters are not allowed', input: '.?/)' },
    { field: 'state', expectedMessage: 'Numbers are not allowed', input: '1234' },
    { field: 'phoneNumber', expectedMessage: 'Special characters are not allowed', input: '.?/)' },
    { field: 'phoneNumber', expectedMessage: 'Characters are not allowed', input: 'asdf' },
    { field: 'pin', expectedMessage: 'PIN Code must have 6 Digits', input: '1' },
    { field: 'pin', expectedMessage: 'PIN Code must have 6 Digits', input: '12' },
    { field: 'pin', expectedMessage: 'PIN Code must have 6 Digits', input: '123' },
    { field: 'pin', expectedMessage: 'PIN Code must have 6 Digits', input: '1234' },
    { field: 'pin', expectedMessage: 'PIN Code must have 6 Digits', input: '12345' },
    { field: 'pin', expectedMessage: 'Characters are not allowed', input: 'asdfad' },
];

