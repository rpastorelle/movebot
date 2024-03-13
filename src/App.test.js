import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

afterEach(() => {
  localStorage.clear();
});

test('moves icon up with ArrowDown key', () => {
  render(<App />);
  expect(screen.getByTestId('cell-0-0')).toHaveTextContent('🤖');
  // Add assertions to verify the icon moved down
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByTestId('cell-1-0')).toHaveTextContent('🤖');
});

test('does not move icon above the board', () => {
  render(<App />);
  expect(screen.getByTestId('cell-0-0')).toHaveTextContent('🤖');
  // Add assertions to verify the icon moved down
  fireEvent.keyDown(window, { key: 'ArrowUp' });
  expect(screen.getByTestId('cell-0-0')).toHaveTextContent('🤖');
});

test('does not move icon off the board at bottom-right', () => {
  localStorage.setItem('coordinates', JSON.stringify({ x: 9, y: 9 }));
  render(<App />);
  expect(screen.getByTestId('cell-9-9')).toHaveTextContent('🤖');
  // Add assertions to verify the icon moved down
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByTestId('cell-9-9')).toHaveTextContent('🤖');
  // Add assertions to verify the icon moved right
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByTestId('cell-9-9')).toHaveTextContent('🤖');
  // Add assertions to verify the icon moved right
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.getByTestId('cell-9-8')).toHaveTextContent('🤖');
});

test('initializes coordinates from local storage', () => {
  localStorage.setItem('coordinates', JSON.stringify({ x: 5, y: 5 }));
  render(<App />);
  expect(screen.getByTestId('cell-5-5')).toHaveTextContent('🤖');
});

test('updates local storage on coordinate change', () => {
  render(<App />);
  expect(screen.getByTestId('cell-0-0')).toHaveTextContent('🤖');
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(JSON.parse(localStorage.getItem('coordinates'))).toEqual({ x: 1, y: 0 });
});

