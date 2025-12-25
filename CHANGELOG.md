# Changelog

## [0.1.8] - 2025-12-23

### Features

- **Frontend:** Implement project management in Admin Control Panel.
- **Frontend:** Implement user detail editing functionality.
- **Frontend:** Add roadmap functionality and improve user experience.
- **Frontend:** Update ACP details and user authentication logic.
- **Frontend:** Add NavigationIcon component with tests.
- **Frontend:** Add Redux Toolkit and React-Redux.
- **Backend:** Setup initial backend environment and configuration.
- **Backend:** Implement Portfolio app with models, serializers, and API endpoints.
- **Backend:** Add Technology model, Serializer, and ViewSet.
- **Backend:** Add Pillow library to requirements.
- **Backend:** Add authentication and CORS configurations.
- **DevEnv:** Integrate dev environment for live-server testing.
- **Editor:** Add TypeScript preference for relative module specifiers and update VSCode settings.

### Bug Fixes

- **Core:** Resolve security vulnerabilities in dependencies.
- **Frontend:** Set `moduleResolution` to `bundler` for correct typechecking.
- **Linting:** Streamline scope-enum definition in commitlint configuration.
- **Linting:** Update linter configuration to use Biome and remove unnecessary ESLint files.
- **Linting:** Update biome check command to use default config path.
- **Tests:** Update navigation icon test to use shorthand type and adjust snapshot.
- **Config:** Update path mapping in tsconfig.base.json to point @utils to the correct index file.
- **CI:** Update CI workflow to run biome-lint instead of lint for affected projects.

### Refactoring

- **Frontend:** Migrate `react-router-dom` to `react-router` v7.
- **Core:** Simplify README structure and enhance project description.
- **Core:** Reorganize imports and improve code consistency across components.
- **Core:** Refactor code structure for improved readability and maintainability.
- **CI:** Update CI workflow and reorganize imports for improved consistency.
- **Backend:** Initialize Python venv in App component if not present (dev setup).
- **Cleanup:** Remove unnecessary navigation elements and comments.

### Build, Dependencies & Chore

- **Deps:** Update `@swc/plugin-emotion` to v14.1.0.
- **Deps:** Align `@types/node` with Node.js 24 runtime.
- **Deps:** Update non-breaking dependencies.
- **Nx:** Complete Nx migration to v22.3.3.
- **Nx:** Start Nx migration and update configuration.
- **Config:** Update pnpm workspace configuration.
- **Style:** Expand .gitignore for Python projects.

## [0.0.1] - Initial Release

- Initial monorepo setup with Nx.
- Basic frontend (React) and backend (Django) structure.
