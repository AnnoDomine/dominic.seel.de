<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->

# Project Overview & Architecture

This is a **Portfolio Monorepo** managed by Nx.
- **Frontend:** Vite + React + TypeScript using Playwright for e2e testing.
- **Backend:** Python Django + PostgreSQL.

## File Structure & Dependencies
- **Root:** Contains `package.json` for JavaScript/Frontend dependencies.
- **apps/backend:** Contains the Django project.
    - Python dependencies are listed in `apps/backend/requirements.txt`.
    - **CRITICAL:** All Python commands **MUST** be executed using the virtual environment located at `apps/backend/venv`.
    - Example: Use `./apps/backend/venv/bin/python` instead of global `python`.

# Development Standards & Code Quality

The project enforces strict quality gates via `.pre-commit-config.yaml`. Ensure all code generated complies with the following tools before suggesting it to the user.

## Frontend (React/TS)
- **Tooling:** Uses **BiomeJS** for both linting and formatting. Do NOT use ESLint or Prettier.
- **Testing:** Uses **Vitest** for unit tests and **Playwright** for e2e.
- **Formatting Rules (Biome):**
    - Indentation: 4 spaces for TS/TSX/JS/JSX, 2 spaces for JSON/Config.
    - Line Width: 120 chars for code, 80 for config files.
    - Quotes: Double quotes (`"`) generally, but follows Biome defaults.
    - Semicolons: Always.
    - Imports: Sorted via Biome `organizeImports`.
    - No Barrel Files allowed (Performance rule).

## Backend (Python/Django)
- **Tooling:** Uses **Ruff** (Linting/Formatting) and **MyPy** (Static Type Checking).
- **Environment:** Python 3.13.
- **Formatting Rules (Ruff):**
    - Line Length: 120 characters.
    - Sorting: Imports must be sorted (isort rules via Ruff).
    - Django specific: `apps.backend` is a known first-party import.
- **Linting Rules:**
    - Active Rules: `E` (pycodestyle), `F` (Pyflakes), `W` (warnings), `B` (bugbear), `I` (isort), `C901` (complexity), `PL` (Pylint).
    - Ignored in generic files: `PLR0913` (too many args), `PLR0911`, `PLR0912`, `PLR0915`.
- **Type Checking (MyPy):**
    - Strict settings enabled.
    - Django stubs enabled.
    - Run command: `./apps/backend/venv/bin/python -m mypy apps/backend`.

# Git & Commit Convention

Commits are validated by **Commitlint** and must follow **Conventional Commits**.

## Commit Message Format
`<type>(<scope>): <subject>`

- **Allowed Scopes:**
  - `frontend`
  - `backend`
  - `core`
  - `shared`

- **Allowed Types:**
  - `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

## Pre-commit Hooks
The following checks run automatically on commit. You should anticipate these failures:
1. `trailing-whitespace` & `end-of-file-fixer`
2. `check-yaml` & `check-json`
3. `ruff-check` & `ruff-format` (Backend)
4. `mypy` (Backend)
5. `biome check` (Frontend)
6. `commitlint` (Commit message validation)

## Aditional instruction

- All answers have to be in english
- Add to every component, function, variable, class, method,... docstrings in english
- Branch naming have a specific convention. Only branchnames are valid with the prefix "feat/", "docs/", "fix/" and "test/"
    - feat: Feature branch with major changes on existing features or add new or delete old features
    - docs: Changes to documentations (README.md, LICENSE.txt,...)
    - fix: Minor patches and bugfix branches
    - test: Branches with major changes to unit and e2e tests
- Mixed branches (With multiple change types) are use "feat/" as prefix.
