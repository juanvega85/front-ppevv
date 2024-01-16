# `turborepo` ppe-monorepo

This is a monorepo with app and shared packages.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `app`: Main app with general settings

- `ui`: a React UI library
- `scripts`: eslint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo
- `eslint-config`: general eslint settings used throughout the monorepo
- `authentication`: authentication context and general types for session handling
- `networking`: axios wrapper to create interceptors
- `common`: React componentes to handle login and user access
- `event-calendars`: React componentes to display events inside a calendar
- `preferences`: React componentes to set user preferences
- `profiles`: React componentes to handle profiles
- `scheduling`: React componentes to handle schedules
- `shifts`: React componentes to handle shifts
- `sites`: React componentes to handle sites
- `teams`: React componentes to handle teams


Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
