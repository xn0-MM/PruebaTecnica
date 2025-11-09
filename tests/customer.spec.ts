import { ICustomerData } from '@/model/agents/customer.agent';
import { test, expect } from '@/fixtures/actions.fixture';
import { formatScenarios, blankFieldScenarios } from '@/testdata/scenarios.data';
import { test as createdUserTest } from '@/fixtures/create.customer.fixture';

test.describe('Feature: Nuevo Cliente', () => {
    test('Scenario: Crear un nuevo cliente con datos válidos ', {
        tag: ['@regresion', '@ci', '@dev'],
    }, async ({
        customerActions,
        navigationActions,
        routes,
        customerFactory,
        page,
    }) => {
        const data = customerFactory.valid().toJSON();

        await test.step('Given el manager esta autenticado', async () => {
            // Gestionado por la fixture de autenticación
        });

        await test.step('And navega a la página a la página "New Customer"', async () => {
            await navigationActions.goTo(routes.newCustomerPage);
        });

        await test.step('When rellena el formulario con datos válidos', async () => {
            await customerActions.fillForm(data);
        });

        await test.step('And pulsa el botón "Submit"', async () => {
            await customerActions.submitForm();
        });

        await test.step('Then los datos del cliente aparecen en la tabla', async () => {

            const registeredCustomerData = await customerActions.getRegisteredFormData(data);
            const customerDataUpdated: ICustomerData = {
                ...data,
                id: registeredCustomerData.id
            };

            expect(registeredCustomerData).toStrictEqual(customerDataUpdated);
        });

        await test.step('And se muestra lel mensaje "Customer Registered Successfully!!!"', async () => {
            const messagee = await customerActions.getSuccessMesage();
            expect(messagee).toBe('Customer Registered Successfully!!!');
        });

        await test.step('And pulsa el botón "Continue"', async () => {
            await customerActions.continue();
        });

        await test.step('And se redirige a la página "Manager HomePage"', async () => {
            expect(page.url()).toBe(routes.baseUrl + routes.homePage);
        });
    });
});

test('Scenario: Verificar el funcionamiento del bottón Reset en el formulario de nuevo cliente', {
    tag: ['@regresion', '@ci'],
}, async ({
    navigationActions,
    customerActions,
    routes,
    customerFactory
}) => {
    const emptyData = customerFactory.empty().toJSON();

    await test.step('Given el manager esta autenticado', async () => {
        // Gestionado por la fixture de autenticación
    });

    await test.step('And navega a la página a la página "New Customer"', async () => {
        await navigationActions.goTo(routes.newCustomerPage);
    });

    await test.step('And rellena el formulario con datos válidos', async () => {
        await customerActions.fillForm(customerFactory.valid());
    });

    await test.step('And pulsa el botón "RESET"', async () => {
        await customerActions.resetForm();
    });

    await test.step('Then los campos del formulario deben estar vacíos', async () => {
        const customerData = await customerActions.getFormData();
        const normalicedData = { ...customerData, gender: '' };

        expect(normalicedData).toStrictEqual(emptyData);
    });
});

test.describe('Feature: Validaciones formulario nuevo cliente', () => {

    for (const scenario of blankFieldScenarios) {
        test(`Scenario Outline: El campo ${scenario.field} dene contener datos`, {
            tag: ['@regresion', '@ci'],
        }, async ({
            navigationActions,
            customerActions,
            routes,
            customerFactory,
        }) => {
            const data = customerFactory.excludingField(scenario.field).toJSON();

            await test.step('Given el manager esta autenticado', async () => {
                // Gestionado por la fixture de autenticación
            });

            await test.step('And navega a la página a la página "New Customer"', async () => {
                await navigationActions.goTo(routes.newCustomerPage);
            });

            await test.step(`And rellena el formulario dejando el campo "${scenario.field}" vacío`, async () => {
                await customerActions.fillForm(data);
            });

            await test.step('Then se muestra el mensaje de error', async () => {
                const errorMessage = await customerActions.getErrorMessage(scenario.field);

                expect(errorMessage).toBe(scenario.expectedMessage);
            });
        });
    }

    for (const scenario of formatScenarios) {
        test(`Scenario Outline: Validación de formato sobre el campo "${scenario.field}" - valor: "${scenario.input}"`, {
            tag: ['@regresion', '@ci'],
        }, async ({
            navigationActions,
            customerActions,
            routes,
        }) => {

            await test.step('Given el manager esta autenticado', async () => {
                // Gestionado por la fixture de autenticación
            });

            await test.step('And navega a la página a la página "New Customer"', async () => {
                await navigationActions.goTo(routes.newCustomerPage);
            });

            await test.step(`And rellena el campo "${scenario.field}" con el dato erróneo "${scenario.input}"`, async () => {
                await customerActions.setFieldValue(scenario.field, scenario.input);
            });

            await test.step('Then se muestra el mensaje de error', async () => {
                const errorMessage = await customerActions.getErrorMessage(scenario.field);

                expect(errorMessage).toBe(scenario.expectedMessage);
            });
        });
    }

    test('Scenario: No se puede enviar el formulario vacio', {
        tag: ['@regresion', '@ci'],
    }, async ({
        navigationActions,
        customerActions,
        customerFactory,
        routes,
    }) => {
        let dialogMessage: string;
        const emptyData = customerFactory.empty().toJSON();

        await test.step('Given el manager esta autenticado', async () => {
            // Gestionado por la fixture de autenticación
        });

        await test.step('And navega a la página a la página "New Customer"', async () => {
            await navigationActions.goTo(routes.newCustomerPage);
        });


        await test.step('el formulario no contiene ningún dato', async () => {
            const customerData = await customerActions.getFormData();
            const normalicedData = { ...customerData, gender: '' };

            expect(normalicedData).toStrictEqual(emptyData);
        });

        await test.step('And pulsa el botón "Submit"', async () => {
            [dialogMessage] = await Promise.all([
                customerActions.getDialogMessage(),
                customerActions.submitForm(),
            ]);
        });

        await test.step('Then se muestran se muestra un dialog con el mensaje "please fill all fields"', async () => {
            expect(dialogMessage).toBe('please fill all fields');
        });
    });
});

test('Scenario: No se puede crear un client con fecha futura', {
    tag: ['@regresion', '@ci'],
}, async ({
    navigationActions,
    customerActions,
    routes,
    customerFactory
}) => {

    const data = customerFactory.withFutureDate().toJSON();
    let dialogMessage: string;

    await test.step('Given el manager esta autenticado', async () => {
        // Gestionado por la fixture de autenticación
    });

    await test.step('And navega a la página a la página "New Customer"', async () => {
        await navigationActions.goTo(routes.newCustomerPage);
    });
    await test.step('And rellena el formulario con fecha futura', async () => {
        await customerActions.fillForm(data);
    });

    await test.step('And pulsa el botón "Submit"', async () => {
        [dialogMessage] = await Promise.all([
            customerActions.getDialogMessage(),
            customerActions.submitForm(),
        ])
    });

    await test.step('Then se muestra un dialog con el mensaje "Date Field must not be future date"', async () => {
        expect(dialogMessage).toBe('Date Field must not be future date');

    });
});

createdUserTest('Scenario: No se puede crear un cliente con un email ya registrado', {
    tag: ['@regresion', '@ci'],
}, async ({
    navigationActions,
    customerActions,
    routes,
    createdUser,
    page,
    baseURL
}) => {

    let dialogMessage: string;

    await test.step('Given el manager esta autenticado', async () => {
        // Gestionado por la fixture de autenticación
    });

    await test.step('And navega a la página a la página "New Customer"', async () => {
        await navigationActions.goTo(routes.newCustomerPage);
    });

    await test.step('And rellena el formulario con un email ya registrado', async () => {
        await customerActions.fillForm(createdUser);
    });

    await test.step('And pulsa el botón "Submit"', async () => {
        [dialogMessage] = await Promise.all([
            customerActions.getDialogMessage(),
            customerActions.submitForm(),
        ])
    });

    await test.step('Then se muestra un dialog con el mensaje "Email Address Already Exist !!"', async () => {
        expect(dialogMessage).toBe('Email Address Already Exist !!');
    });

    await test.step('And se muestra la página "New Customer"', async () => {
        await page.waitForURL(baseURL + routes.newCustomerPage);
        expect(page.url()).toBe(baseURL + routes.newCustomerPage);
    });

});

