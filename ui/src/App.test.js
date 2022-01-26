import { render, screen } from '@testing-library/react';
import App from './App';

test('renders moon heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Moon/i);
  expect(linkElement).toBeInTheDocument();
});
