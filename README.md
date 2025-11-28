# 🧪 Framework de Automatización – Guru99 Bank (Playwright + TypeScript)

Framework de pruebas **end-to-end** para la demo pública **Guru99 Bank**, construido con **Playwright** y **TypeScript**.

El objetivo *no* es solo automatizar unos pocos tests, sino **mostrar cómo estructurar un framework de testing escalable y orientado al dominio**, usando patrones habituales en entornos “enterprise”.

👉 **Reportes publicados:**  
📊 https://xn0-mm.github.io/PruebaTecnica/

---

## 🎯 Objetivo del proyecto

Este repositorio nace como **prueba técnica** y a la vez como **ejemplo de arquitectura de automatización**.  
Está **deliberadamente sobredimensionado** para la simplicidad de la aplicación bajo prueba (Guru99 Bank), con la idea de demostrar:

- Diseño por capas y separación clara de responsabilidades.
- Modelado del **dominio** (Manager, Customer) por encima de selectores sueltos.
- Uso de **fixtures avanzadas de Playwright** para construir un DSL de pruebas legible.
- Integración con **CI**, sharding dinámico y publicación automática de reportes.
- Documentación de los flujos clave también en **formato Gherkin**, alineando negocio y automatización.

---

## 🧱 Filosofía de diseño

Los principios que guían el diseño del framework son:

1. **Orientado al dominio, no al HTML**
   - Se trabaja con conceptos como `Manager`, `Customer`, `CustomerData`, `ManagerAgent`…
   - Los tests validan contra modelos (`ICustomerData`) y no contra combinaciones de selectores.

2. **Capas finas y bien separadas**
   - **Elements**: wrappers reutilizables encima de `Locator` (`Input`, `Button`, `RadioButton`, `Table`).
   - **Components**: piezas de UI agregadas (`NavBarComponent`).
   - **Pages**: Page Objects que representan las pantallas de Guru99 Bank.
   - **Actions**: orquestan flujos de negocio (login, alta de cliente, navegación, etc.).
   - **Agents / Factories**: representan actores del sistema y generan datos consistentes.
   - **Fixtures**: inyectan en los tests todas las herramientas necesarias (acciones, rutas, agentes, etc.).

3. **Tests legibles de estilo BDD**
   - `Feature` / `Scenario` en los `describe`/`test`.
   - Uso de `test.step` para documentar claramente el flujo (Given/When/Then).
   - Nombres de tests en castellano, orientados a negocio.
   - Se incluyen ejemplos de los flujos principales en **Gherkin** para facilitar la comunicación con perfiles no técnicos.

4. **Data-driven y validaciones fuertes**
   - `CustomerFactory` genera datos coherentes usando `@faker-js/faker`.
   - `blankFieldScenarios` y `formatScenarios` definen matrices de validación para el formulario de “New Customer”.
   - `Table` + `CustomerDataMapper` mapean la tabla de resultados a un `ICustomerData` tipado para comparar datos “de extremo a extremo”.

5. **Gestión de credenciales sin hardcodear**
   - Un `global.setup` crea un Manager en la aplicación y guarda sus credenciales en un `Vault` (JSON en disco).
   - `ManagerAgent` inicializa sus credenciales desde ese `Vault`, evitando credenciales fijas en el código.
   - Este enfoque está pensado para simular cómo se gestionaría el estado compartido en un entorno más realista.

6. **Preparado para CI y crecimiento**
   - Configuración de Playwright con:
     - `baseURL` centralizado.
     - `reporter` múltiple (HTML, list, Monocart, blob/GitHub en CI).
   - Pipeline de GitHub Actions que:
     - Lista los tests y genera un **sharding dinámico** (≈15 tests por shard).
     - Ejecuta los tests en paralelo.
     - Publica los reportes en GitHub Pages.

---

## 🏗️ Arquitectura del proyecto

Estructura principal de carpetas:

```text
src/
  actions/        # Clases de acciones que encapsulan flujos de negocio
  data/           # Configuración de rutas e información estática
  fixtures/       # Fixtures de Playwright que inyectan acciones, agentes y contexto
  model/
    agents/       # Representación de actores del sistema (Manager, Customer)
    components/   # Componentes de UI reutilizables (NavBar, etc.)
    elements/     # Wrappers de elementos (Input, Button, RadioButton, Table)
    factories/    # Fabricas de datos (CustomerFactory)
    pages/        # Page Objects (Login, Home, New Customer, etc.)
  testdata/       # Escenarios de validación (matrices de datos para el formulario)
  utils/          # Utilidades transversales (Vault, mappers, helpers de strings)

tests/
  basic.validations.spec.ts  # Validaciones básicas de la página de login
  login.spec.ts              # Scenarios de login (OK / KO / Reset)
  customer.spec.ts           # Scenarios de creación y validación de clientes

global.setup.ts              # Setup global para crear el Manager y guardar credenciales en Vault
global.vars.ts               # Configuración global (timeouts, etc.)
playwright.config.ts         # Configuración principal de Playwright
package.json                 # Scripts y dependencias
```

---

## 🧪 Estrategia de pruebas implementada

A nivel funcional, el framework cubre:

### Login

- **Login exitoso** con credenciales válidas.
- **Login fallido** con contraseña incorrecta.
- **Botón Reset**:
  - Verifica que usuario y contraseña se limpian correctamente.

### Nuevo cliente

- **Creación correcta de un nuevo cliente**:
  - Relleno del formulario con datos válidos (`CustomerFactory`).
  - Verificación de que los datos mostrados en la tabla coinciden con el modelo `ICustomerData`.
  - Verificación del mensaje de éxito y de la redirección posterior.

- **Validaciones de campos vacíos**:
  - Uso de `blankFieldScenarios` para iterar por todos los campos obligatorios.

- **Validaciones de formato**:
  - Uso de `formatScenarios` para:
    - Emails inválidos.
    - Caracteres especiales donde no corresponden.
    - Números en campos de texto, y viceversa.
    - Reglas específicas de longitud para el PIN.

- **Email duplicado**:
  - Fixture `create.customer.fixture.ts` crea un usuario previo.
  - El test valida el mensaje `"Email Address Already Exist !!"` y la permanencia en la página de “New Customer”.

Los tests usan **tags** (`@regresion`, `@ci`, `@dev`) para poder filtrar baterías desde los scripts de `npm`.

---

## 📋 Plan de pruebas en Gherkin

A continuación se detalla el **plan de pruebas funcionales** expresado en Gherkin, alineado con los tests automatizados del proyecto.

# Plan de Pruebas Detallado - Guru99 Bank

## 1. Funcionalidades Core

### 1.1 Gestión de Sesión

```gherkin
Feature: Validar la funcionalidad del login

  @ui @regresion @ci
  Scenario: Iniciar sesión con credenciales correctas
    Given el manager navega a la página de login
    When introduce un usuario y contraseña válidos
    And pulsa el botón "LOGIN"
    Then se muestra la página de inicio

  @ui @regresion @ci
  Scenario: Iniciar sesión con credenciales incorrectas
    Given el manager navega a la página de login
    When introduce un usuario y contraseña incorrectos
    And pulsa el botón "LOGIN"
    Then se muestra un dialog con el mensaje "User or Password is not valid"

  @ui @regresion @ci
  Scenario: Verificar el funcionamiento del botón Reset
    Given el manager navega a la página de login
    When introduce usuario y contraseña
    And pulsa el botón "RESET"
    Then ambos campos deben quedar vacíos
```

### 1.2 Gestión de Clientes

```gherkin
Feature: Nuevo Cliente

  @regresion @ci @dev
  Scenario: Crear un nuevo cliente con datos válidos
    Given el manager esta autenticado
    And navega a la página "New Customer"
    When rellena el formulario con datos válidos
    And pulsa el botón "Submit"
    Then los datos del cliente aparecen en la tabla
    And se muestra el mensaje "Customer Registered Successfully!!!"
    When pulsa el botón "Continue"
    Then se redirige a la página "Manager HomePage"

  @regresion @ci
  Scenario: Verificar el funcionamiento del botón Reset en el formulario
    Given el manager esta autenticado
    And navega a la página "New Customer"
    And rellena el formulario con datos válidos
    When pulsa el botón "RESET"
    Then los campos del formulario deben estar vacíos

Feature: Validaciones formulario nuevo cliente

  @regresion @ci
  Scenario Outline: Campos obligatorios
    Given el manager esta autenticado
    And navega a la página "New Customer"
    When rellena el formulario dejando el campo "<field>" vacío
    Then se muestra el mensaje de error "<message>"

    Examples:
      | field        | message                         |
      | name         | Customer name must not be blank |
      | dateOfBirth  | Date Field must not be blank    |
      | address      | Address Field must not be blank |
      | city         | City Field must not be blank    |
      | state        | State must not be blank         |
      | pin          | PIN Code must not be blank      |
      | phoneNumber  | Mobile no must not be blank     |
      | email        | Email-ID must not be blank      |
      | password     | Password must not be blank      |

  @regresion @ci
  Scenario Outline: Validaciones de formato
    Given el manager esta autenticado
    And navega a la página "New Customer"
    When rellena el campo "<field>" con el dato erróneo "<input>"
    Then se muestra el mensaje de error "<message>"

    Examples:
      | field       | input    | message                            |
      | email       | johndoe  | Email-ID is not valid              |
      | email       | john@doe | Email-ID is not valid              |
      | name        | .?/)     | Special characters are not allowed |
      | name        | 1234     | Numbers are not allowed            |
      | city        | .?/)     | Special characters are not allowed |
      | city        | 1234     | Numbers are not allowed            |
      | phoneNumber | asdf     | Characters are not allowed         |
      | pin         | 12345    | PIN Code must have 6 Digits        |

  @regresion @ci
  Scenario: No se puede enviar el formulario vacío
    Given el manager esta autenticado
    And navega a la página "New Customer"
    When el formulario no contiene ningún dato
    And pulsa el botón "Submit"
    Then se muestra un dialog con el mensaje "please fill all fields"

  @regresion @ci
  Scenario: No se puede crear un cliente con fecha futura
    Given el manager esta autenticado
    And navega a la página "New Customer"
    When rellena el formulario con fecha futura
    And pulsa el botón "Submit"
    Then se muestra un dialog con el mensaje "Date Field must not be future date"

  @regresion @ci
  Scenario: No se puede crear un cliente con un email ya registrado
    Given el manager esta autenticado
    And existe un cliente previamente registrado
    And navega a la página "New Customer"
    When rellena el formulario con un email ya registrado
    And pulsa el botón "Submit"
    Then se muestra un dialog con el mensaje "Email Address Already Exist !!"
    And se mantiene en la página "New Customer"
```

---

## 🧬 Estado actual, condicionantes y evolución prevista

Actualmente este framework está condicionado por varios factores:

- Nace como una **prueba técnica** sobre la demo pública de Guru99 Bank.
- La aplicación bajo prueba es limitada funcionalmente en comparación con la arquitectura del framework.
- Dependemos de una tercera parte y de su estabilidad/datos para ejecutar las pruebas.

Además, el alcance inicial del proyecto viene definido por los **condicionantes originales de la prueba técnica**:

- Visita la página que se va a probar usando Chrome y Firefox como navegadores.
- Verifica que el título de la página sea correcto (Guru99 Bank).
- Comprueba que el botón reset cumple su cometido.
- Plantea un caso de prueba positivo (credenciales correctas).
- Además de estas pruebas mínimas, una vez que inicias sesión en el formulario de login, verás un menú de opciones a la izquierda (New Customer, Edit Customer, Delete Customer, New Account…).
  - Nos gustaría que plantearas un plan de pruebas que automatice una serie de pruebas para esa funcionalidad (solo una, elige la que quieras).
  - Elige las pruebas que consideres sobre la funcionalidad del menú elegida para tener una cobertura funcional adecuada.

La idea a medio plazo es que el proyecto **mute hacia otra página dummy de testing más compleja**, totalmente controlada o fácilmente replicable, manteniendo la **misma filosofía de diseño** (capas, dominio, fixtures avanzadas, data-driven, etc.), pero apoyándose en un dominio funcional más rico que permita explotar mejor la arquitectura existente.

---

## ⚙️ Ejecución local

### Requisitos

- Node.js (recomendado LTS).
- `npm` o `pnpm`.

### Instalación

```bash
npm install
npx playwright install --with-deps
```

### Ejecutar todos los tests

```bash
npm test
# o
npx playwright test
```

### Ejecutar por tipo de suite (tags)

```bash
# Solo escenarios de desarrollo (@dev)
npm run devtest

# Regresión (@regresion)
npm run regressiontest

# Suite de CI (@ci)
npm run citest
```

### Ver reportes localmente

```bash
npx playwright show-report
```

Para el reporte HTML publicado en GitHub Pages, se puede consultar:  
📊 https://xn0-mm.github.io/PruebaTecnica/

---

## 🚧 Limitaciones y trabajo futuro

Este framework es intencionadamente **más grande** que la aplicación que prueba. Algunas decisiones (como el uso de `Vault` o la gestión dinámica de credenciales) tienen más sentido en un entorno corporativo que en una demo pública.

Posibles líneas de mejora:

- Cobertura API: añadir tests de API (si aplica) para validar contratos y datos antes/depués del flujo UI.
- Visual & accesibilidad: incorporar regresión visual (por ejemplo, Playwright trace+screenshots base) y chequeos de accesibilidad (axe-core).
- Gestión de flakiness: marcar y aislar tests inestables, con métricas de reintentos y quarantena automática.
- Datos de prueba controlados: añadir un seeding determinista (fixtures + datos fijos) y limpieza por ejecución para reducir dependencia del estado previo.
- Notificaciones y trazabilidad: enviar reportes resumidos a Slack/Teams con enlaces a trazas/HTML, y etiquetar builds con hash de commit y shard.
- Matrices de entorno: permitir ejecución en distintos baseURL/entornos (dev/stage) vía variables y fixtures de entorno.
- Seguridad y compliance: escanear dependencias (npm audit/snyk) en CI y validar que no se exponen secretos en trazas/reports.
- Observabilidad de tests: métricas agregadas (tiempo por test/tag, tasa de fallos) y panel ligero para detectar regresiones de tiempo.
- Contenerización local/CI: Dockerfile para entorno reproducible de Playwright (navegadores, deps) y caching afinado en CI para npm+playwright.