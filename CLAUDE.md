# MOM Project Guidelines

## Development Commands
- Build: `npm run build`
- Dev server: `npm run dev` (with Turbopack)
- Start: `npm run start`
- Lint: `npm run lint`

## Code Style

### TypeScript
- Strict type checking enabled
- Use explicit return types (e.g., `function Component(): ReactNode`)
- Import types with `import type` syntax
- Use type annotations for all function parameters

### Component Structure
- React functional components with explicit return types
- Export constants at the file level when appropriate
- Props interfaces should be defined inline with component parameters

### Formatting
- Single quotes for strings, with values in JSX wrapped in curly braces
- Tab width: 4 spaces
- Line width: 120 characters
- Use className objects with template strings for complex classnames
- Use Tailwind for styling

### Imports
- Use absolute imports with @ alias (e.g., `@/components/common/Header`)
- Group imports by: 1) external libraries, 2) internal components, 3) types

### Naming
- PascalCase for components and component files
- camelCase for functions, variables, and non-component files
- Use descriptive and specific names