import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../pages/Login';

// Create a mock Redux store for testing
const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: (state = {}) => state, // Mock auth slice
    },
  });
};

// Helper function to render component with required providers
const renderWithProviders = (component) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

// Test suite for Login component
describe('Login Component', () => {
  // Test if login heading renders
  it('should render login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
  });

  // Test if email and password input fields render
  it('should have email and password inputs', () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  // Test if email input has correct type attribute
  it('should validate email format', () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  // Test if login button renders
  it('should have login button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});
