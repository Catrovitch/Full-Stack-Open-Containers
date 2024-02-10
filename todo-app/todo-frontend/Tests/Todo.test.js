/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from '../src/Todos/Todo'

describe('Todo component', () => {
  const todo = {
    id: 1,
    text: 'Test Todo',
    done: false
  };
  const deleteTodo = jest.fn();
  const completeTodo = jest.fn();

  test('calls deleteTodo when delete button is clicked', () => {
    const { getByText } = render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    fireEvent.click(getByText('Delete'));
    expect(deleteTodo).toHaveBeenCalledWith(todo);
  });

  test('calls completeTodo when checkbox is toggled', () => {
    const { getByRole } = render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(completeTodo).toHaveBeenCalledWith(todo);
  });

  test('checkbox is checked if todo is marked as done', () => {
    const doneTodo = {
      ...todo,
      done: true
    };
    const { getByRole } = render(<Todo todo={doneTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(true);
  });

  test('checkbox is not checked if todo is not done', () => {
    const { getByRole } = render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
  });
});
