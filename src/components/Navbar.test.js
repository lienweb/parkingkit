import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Navbar';

it('renders button', () => {
  render(<Nav />, { wrapper: BrowserRouter });
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
