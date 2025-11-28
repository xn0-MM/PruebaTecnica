import { test, expect } from '@/fixtures/actions.fixture';
import { routes } from '@/data/routes';
import { globalVars } from '../global.vars';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Feature: Login', () => {
    test('Scenario: Inicio de sesión con credenciales válidos', {
        tag: ['@regresion', '@ci'],
    }, async ({
        page,
        navigationActions,
        loginActions,
        managerActions,
        manager,
    }) => {
        const credentials = manager.getCredentials();

        await test.step('Given el manager navega a la página de login', async () => {
            await navigationActions.goTo(routes.loginPage);
        });

        await test.step('When introduce un usuario y contraseña válidos', async () => {
            await loginActions.fillForm(credentials);
        });

        await test.step('And pulsa el botón "LOGIN"', async () => {
            await loginActions.clickLoginButton();
        });

        await test.step('Then se muestra la página de inicio', async () => {
            await managerActions.homePage.navBar.locator.waitFor({
                state: 'visible',
                timeout: globalVars.timeout,
            });

            expect(page.url()).toBe(routes.baseUrl + routes.homePage);
        });
    });

    test('Scenario: Iniciar sesión con credenciales inválidos', {
        tag: ['@regresion', '@ci'],
    }, async ({
        navigationActions,
        loginActions,
        manager,
    }) => {
        let dialogMessage: string;
        const wrongCredentials = manager.getInvalidCredentials();

        await test.step('Given el manager navega a la página de login', async () => {
            await navigationActions.goTo(routes.loginPage);
        });

        await test.step('When introduce un usuario y contraseña válidos', async () => {
            await loginActions.fillForm(wrongCredentials);
        });

        await test.step('And pulsa el botón "LOGIN"', async () => {
            [dialogMessage] = await Promise.all([
                loginActions.getDialogMessage(),
                loginActions.clickLoginButton()
            ]);
        });

        await test.step('Then se muestra el dialog con el mensaje "User or Password is not valid"', async () => {
            expect(dialogMessage).toBe('User or Password is not valid');
        });
    });

    test('Scenario: Verificar el funcionamiento del botón Reset', {
        tag: ['@regresion', '@ci'],
    }, async ({
        navigationActions,
        loginActions,
        manager
    }) => {
        await test.step('Given el manager navega a la página de login', async () => {
            await navigationActions.goTo(routes.loginPage);
        });

        await test.step('When introduce un usuario y contraseña', async () => {
            await loginActions.fillForm(manager);
        });

        await test.step('And pulsa el botón "RESET"', async () => {
            await loginActions.clickResetButton();
        });

        await test.step('Then ambos campos deben quedar vacíos', async () => {
            const managerData = await loginActions.getManagerCredentials();
            expect(managerData.id).toBe('');
            expect(managerData.password).toBe('');
        });
    });
});
