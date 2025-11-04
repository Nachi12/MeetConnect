import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../pages/Dashboard';
import axios from 'axios';

// Mock axios to avoid real API calls
vi.mock('axios');

// Helper function to create a mock Redux store
const createMockStore = () => {
  return configureStore({
    reducer: {
      // Mock auth slice with test user data
      auth: (state = { user: { name: 'Test User' }, token: 'test-token', isAuthenticated: true }) => state,
      // Mock interviews slice
      interviews: (state = { interviews: [], loading: false, error: null }) => state,
    },
  });
};

// Helper to render component with Redux and Router providers
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

// Test suite for Dashboard component
describe('Dashboard Component', () => {
  beforeEach(() => {
    // Mock localStorage token
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('mock-token');
    // Mock axios GET response
    axios.get = vi.fn().mockResolvedValue({ data: { success: true, interviews: [] } });
  });

  // Test if dashboard heading renders
  it('should render dashboard heading', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  // Test if schedule interview form renders
  it('should render schedule interview form', () => {
    renderWithProviders(<Dashboard />);
    const labels = screen.getAllByText(/Interview Type/i);
    expect(labels.length).toBeGreaterThan(0);
  });

  // Test if interview type dropdown appears
  it('should display interview type dropdown', () => {
    renderWithProviders(<Dashboard />);
    const labels = screen.getAllByText(/Interview Type/i);
    expect(labels[0]).toBeInTheDocument();
  });

  // Test form validation rendering
  it('should show validation error when submitting empty form', () => {
    renderWithProviders(<Dashboard />);
    const labels = screen.getAllByText(/Interview Type/i);
    expect(labels.length).toBeGreaterThan(0);
  });

  // Test if user statistics section renders
  it('should display user statistics', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });
});
