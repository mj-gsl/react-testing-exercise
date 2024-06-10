import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';
import { addTodo } from '../functions/addTodo';

jest.mock('../functions/addTodo');

test('renders TodoList component', async () => {
  await act(async () => {
    render(<TodoList />);
  });
  const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
  expect(inputElement).toBeInTheDocument();
});

test('adds a new todo item', async () => {
  addTodo.mockImplementation((todos, newTodo) => [...todos, newTodo]);

  await act(async () => {
    render(<TodoList />);
  });
  const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
  const buttonElement = screen.getByText(/Add Todo/i);

  fireEvent.change(inputElement, { target: { value: 'Learn Jest' } });
  fireEvent.click(buttonElement);

  const todoItem = screen.getByText(/Learn Jest/i);
  expect(todoItem).toBeInTheDocument();
});
