# React Todo App with Custom useLocalStorage Hook

A simple and elegant Todo List app built with React + TypeScript + Vite, featuring a custom hook for localStorage persistence and full unit test coverage using Vitest and React Testing Library.

## Features

- Add, complete, and remove todos
- Persistent storage using a custom `useLocalStorage` hook
- Prevents empty todos
- Clean, responsive UI (light mode only)
- Fully tested components and hooks

## Tech Stack

| Category    | Tools |
|-------------|-------|
| Framework   | React 18 |
| Language    | TypeScript |
| Build Tool  | Vite |
| Styling     | CSS |
| Testing     | Vitest, @testing-library/react, @testing-library/jest-dom |

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/<your-username>/todo-app.git

cd todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:5173 in your browser.

## Folder Structure

```
src/
├── App.tsx                # Main app component
├── App.css                # App styling
├── hooks/
│   ├── useLocalStorage.ts # Custom localStorage hook
│   └── useLocalStorage.test.ts # Unit tests for hook
├── types/
│   └── todo.ts            # TodoType interface
├── test/
│   └── setup.ts           # Jest-DOM setup for Vitest
└── App.test.tsx           # Integration tests for the app
```

## Testing

Run the full test suite with:

```bash
npm run test
```

Or run interactively in watch mode:

```bash
npm run test:watch
```

### Test Coverage Includes

- Rendering components correctly
- Adding, completing, and removing todos
- Preventing empty todo additions
- Persistent data using `useLocalStorage`
- Hook initialization and localStorage syncing

## Custom Hook: `useLocalStorage`

The `useLocalStorage` hook provides an easy way to keep React state synced with `localStorage`.

```ts
const [todos, setTodos] = useLocalStorage<TodoType[]>('todos', []);
```

### Features:

- Automatic sync between state and `localStorage`
- JSON serialization/deserialization
- Safe fallback for SSR and invalid data

## Example Todo Flow

1. Type a new task and press Add or hit Enter
2. The new todo appears instantly and is stored in localStorage
3. Reload the page — your todos persist
4. Check off or remove items anytime