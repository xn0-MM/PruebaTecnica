# 🧪 Framework de Automatización – Guru99 Bank

Framework de pruebas **automatizadas end-to-end** para la aplicación demo **Guru99 Bank**, desarrollado con **Playwright** y **TypeScript**.

👉 **Reportes publicados:**  
📊 [https://xn0-mm.github.io/PruebaTecnica/](https://xn0-mm.github.io/PruebaTecnica/)

---

## 📘 Descripción General

Este framework implementa una arquitectura **Page Object Model (POM)** extendida con capas adicionales que facilitan el mantenimiento, la escalabilidad y la reutilización de código.  
Permite automatizar pruebas funcionales, de regresión y validaciones de formularios en los módulos principales del sistema bancario.

---

## 🏗️ Arquitectura del Framework

```
├── src/
│   ├── actions/       # Clases de acciones que implementan comportamientos de página
│   ├── data/         # Datos de prueba y configuración
│   ├── fixtures/     # Fixtures de Playwright
│   ├── model/        # Componentes core del framework
│   │   ├── agents/   # Clases de agentes para diferentes tipos de usuario
│   │   ├── component # Componentes UI reutilizables
│   │   ├── elements/ # Elementos UI reutilizables
│   │   ├── pages/    # Clases Page Object
│   │   └── factories/# Factories de datos de prueba
│   └── utils/        # Funciones y helpers utilitarios
├── tests/           # Suites de prueba
└── features/        # Archivos feature en Gherkin (documentación)
```
### 🧩 Capas principales

| Capa | Descripción |
|------|--------------|
| **Page Objects** | Encapsulan los elementos y acciones específicas de cada página. |
| **Actions** | Implementan flujos de interacción complejos. |
| **Agents** | Modelan diferentes tipos de usuario (e.g., Manager). |
| **Fixtures** | Configuran el entorno de ejecución y los contextos compartidos. |
| **Factories** | Generan datos dinámicos para pruebas data-driven. |
| **Components / Elements** | Wrappers reutilizables para UI (inputs, formularios, etc.). |

---

## 🧪 Plan de Pruebas

### 1️⃣ Alcance

#### 🔐 Login
- Inicio de sesión exitoso  
- Validación de campos vacíos  
- Comportamiento del botón *Reset*  
- Persistencia de sesión

#### 👤 Gestión de Clientes
- Creación de nuevos clientes  
- Validaciones de campos y formatos  
- Prevención de duplicados  
- Manejo de errores y alertas

---

### 2️⃣ Tipos de Prueba

| Tipo | Descripción |
|------|--------------|
| **Funcionales** | Validación de los flujos principales del sistema. |
| **De Validación** | Revisión de formatos y campos obligatorios. |
| **De Regresión** | Cobertura de las funcionalidades críticas. |
| **De UI** | Comprobación de elementos visuales y navegación. |
| **Cross-Browser** | Ejecución en Chrome y Firefox. |

---

## 🧠 Estrategia de Ejecución

- **BDD (Behavior-Driven Development)** con sintaxis Gherkin.  
- **Data-Driven Testing**: pruebas parametrizadas por datos dinámicos.  
- **Ejecución Paralela (Sharding)** para optimizar tiempos.  
- **Integración Continua (CI/CD)** mediante GitHub Actions.  

---

## ⚙️ Configuración del Entorno

### Instalación

```bash
# Instalar dependencias del proyecto
npm install
npx playwright install

# Ejecutar todas las pruebas
npm run test

# Pruebas en desarrollo
npm run devtest

# Suite de regresión
npm run regressiontest

# Pruebas para CI
npm run citest

# Linter y formateo
npm run lint
npm run format

# Verificación de tipos
npm run typecheck
```

## Pipeline CI/CD

El proyecto utiliza GitHub Actions para integración continua. El flujo de trabajo (`playwright.yml`) incluye:

1. **División de Pruebas**: Distribuye pruebas en múltiples ejecutores
2. **Pruebas Cross-Browser**: Ejecuta pruebas en Chromium y Firefox
3. **Generación de Reportes**: Crea un reporte en HTML
4. **Despliegue en GitHub Pages**: Publica el reporte automáticamente

El pipeline se ejecuta:
- Por calendario (diariamente a las 3 AM)
- Manualmente vía workflow_dispatch

## Reportes

Se generan reportes en múltiples formatos:
- Reportes HTML (desarrollo local)
- Reportes Blob (pipeline CI)
- Reportes Monocart (datos detallados de ejecución)

Los reportes se publican automáticamente en GitHub Pages después de cada ejecución de CI.

## Configuración

Archivos de configuración principales:

- `playwright.config.ts`: Configuración del runner de pruebas
- `tsconfig.json`: Configuración de TypeScript
- `eslint.config.mts`: Reglas de ESLint
- `.prettierrc`: Reglas de formato de código

## Características Principales

- Arquitectura Page Object Model
- Implementación type-safe usando TypeScript
- Escenarios data-driven
- Ejecución paralela de pruebas
- Reportes comprehensivos
- Integración CI/CD
- Pruebas cross-browser
- Fixtures personalizados
- Factories de datos de prueba
- Componentes UI reutilizables

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
      | field        | message                          |
      | name         | Customer name must not be blank  |
      | dateOfBirth  | Date Field must not be blank    |
      | address      | Address Field must not be blank  |
      | city         | City Field must not be blank     |
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
      | field        | input    | message                            |
      | email        | johndoe  | Email-ID is not valid              |
      | email        | john@doe | Email-ID is not valid              |
      | name         | .?/)     | Special characters are not allowed |
      | name         | 1234     | Numbers are not allowed            |
      | city         | .?/)     | Special characters are not allowed |
      | city         | 1234     | Numbers are not allowed            |
      | phoneNumber  | asdf     | Characters are not allowed         |
      | pin          | 12345    | PIN Code must have 6 Digits        |

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

## 2. Estrategia de Pruebas

### 2.1 Niveles de Prueba
- **Pruebas Unitarias**: No implementadas actualmente
- **Pruebas de Integración**: Verificación de flujos completos
- **Pruebas End-to-End**: Validación de escenarios completos
- **Pruebas de Regresión**: Suite marcada con @regresion

### 2.2 Tipos de Prueba

#### Pruebas Funcionales
- Validación de flujos principales (happy paths)
- Manejo de casos de error
- Validaciones de campos
- Gestión de sesiones

#### Pruebas de UI
- Verificación de elementos visuales
- Validación de mensajes de error
- Comportamiento de botones y formularios
- Redirecciones y navegación

#### Pruebas de Datos
- Validación de formatos
- Verificación de datos obligatorios
- Prevención de duplicados
- Gestión de datos inválidos

### 2.3 Automatización

#### Framework
- **Tecnología**: Playwright + TypeScript
- **Patrón**: Page Object Model
- **Reportes**: HTML, Blob, Monocart

#### Ejecución
- **Entornos**: Local, CI/CD (GitHub Actions)
- **Navegadores**: Chrome, Firefox
- **Paralelización**: Sharding en CI

### 2.4 Etiquetas de Pruebas
- `@dev`: Pruebas en desarrollo
- `@regresion`: Suite de regresión
- `@ci`: Pruebas para CI
- `@ui`: Pruebas de interfaz

## 3. Métricas y Reportes

### 3.1 Reportes Generados
- Reportes HTML para desarrollo local
- Reportes Blob para CI
- Reportes Monocart para análisis detallado

### 3.2 Métricas Clave
- Cobertura de pruebas
- Tiempo de ejecución
- Tasa de éxito/fallo
- Estabilidad de las pruebas

## 4. Mantenimiento

### 4.1 Gestión de Código
- Control de versiones con Git
- Revisión de código
- Formateo automático
- Linting
