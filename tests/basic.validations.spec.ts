import { routes } from '@/data/routes';
import { test, expect } from '@/fixtures/actions.fixture';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Feature: Validaciones básicas sobre Guru99 Bank', () => {
    test('Scenario: Verificar el título de la página ', {
        tag: ['@regresion', '@ci'],
    }, async ({ loginActions, navigationActions }) => {
        await test.step('When el manager navega a la página de login', async () => {
            await navigationActions.goTo(routes.loginPage);
        });

        await test.step('Then el título de la página deberia ser "Guru99 Bank"', async () => {
            await expect(loginActions.loginPage.title).toHaveText('Guru99 Bank');
        });
    });
});
