# TreeGrid 1.0.0

<img src="/public/poster.gif" alt="project poster" />

A modern, interactive tree grid component built with Vue 3, TypeScript, and AG Grid Enterprise.

## About

TreeGrid is a Vue 3 application that provides a hierarchical data visualization component using AG Grid's tree data functionality. It demonstrates best practices for building type-safe, maintainable frontend applications with modern tooling and development workflows.

## Features

- 🌳 **Hierarchical Data Display** - Render nested tree structures with parent-child relationships
- 🔍 **Data Management** - TreeStore utility for querying tree items, children, and ancestors
- 📊 **AG Grid Integration** - Enterprise (trial mode) grid features
- 🎨 **Theme Switching** - Toggle between light and dark themes with smooth animations
- ✨ **Component Architecture** - Well-organized, feature-based folder structure
- 🧪 **Comprehensive Testing** - Unit tests for core logic using Vitest
- 🔒 **Type Safety** - Strict TypeScript configuration with ESLint
- 🚀 **Development Tools** - Hot module reloading with Vite, Git hooks with Husky

### Installation and building

**Clone repository:**

```bash
git clone https://github.com/frontandrew/tree-grid.git
```

**Install dependencies:**

```bash
npm run setup
```

This command runs install dependencies and sets up git hooks manager.

**Start development server:**

```bash
npm run dev
```

The application will open automatically in your default browser.

**Build for production:**

```bash
npm run build
```

This runs TypeScript type checking with `vue-tsc` and builds with Vite.

### Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run setup`   | Install dependencies             |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run test`    | Run unit tests                   |
| `npm run lint`    | Lint and fix code                |
| `npm run format`  | Format code                      |

### Project Structure

```
src/
├── app/              # Main application component
├── features/         # Feature modules
│   ├── tree-grid/    # Tree grid component with AG Grid integration
│   └── theme-toggler/ # Theme switching component
└── shared/           # Shared utilities and components
    ├── theme/        # Theme system and toggle logic
    ├── tree-store/   # TreeStore data structure and tests
    ├── types/        # TypeScript type definitions
    └── ui/           # Reusable UI components
```

### Development Expirience

- **Type Checking**: Full TypeScript support
- **Linting**: ESLint configured with TypeScript and Vue 3 support
- **Formatting**: Prettier for consistent code style
- **Testing**: Vitest for unit testing
- **Automatic code quality**: Pre-commit hooks run tests, linter and formatter for staged files

### Key Technologies

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vite.dev/)** - Fast build tool and dev server
- **[AG Grid](https://www.ag-grid.com/)** - Professional grid framework
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)** - Code quality tools
- **[Husky](https://typicode.github.io/husky/)** - Git hooks management
