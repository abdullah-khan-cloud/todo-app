import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Todo App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders the heading', () => {
        render(<App />);
        expect(screen.getByText(/todo list app/i)).toBeInTheDocument();
    })

    it('renders the input and Add button', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /add/i})).toBeInTheDocument();
    })

    it('adds new todos', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/Add a new todo/i);
        const addButton = screen.getByRole('button', {name: /add/i});

        fireEvent.change(input, { target: { value: 'Buy milk' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Buy milk')).toBeInTheDocument();
    })

    it('mark todo as completed', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/Add a new todo/i);
        const addButton = screen.getByRole('button', {name: /add/i});

        fireEvent.change(input, {target: {value: 'Read book'}});
        fireEvent.click(addButton);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    })

    it('removes a todo', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/Add a new todo/i);
        const addButton = screen.getByRole('button', {name: /add/i});

        fireEvent.change(input, {target: {value: 'Test todo'}});
        fireEvent.click(addButton);

        const removeButton = screen.getByRole('button', {name: /remove/i});
        fireEvent.click(removeButton);

        expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
    })

    it('does not add empty todos', () => {
        render(<App />);
        const addButton = screen.getByRole('button', {name: /add/i});
        fireEvent.click(addButton);

        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    })
})