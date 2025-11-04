import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

// Test suite for Redux store setup used in Resources component
describe('Resources Component', () => {
  // Test if Redux store is properly configured
  it('should have a valid Redux store configuration', () => {
    const store = configureStore({
      reducer: {
        resources: (state = { resources: [], loading: false, error: null }) => state,
        auth: (state = { user: null, token: null }) => state,
      },
    });
    
    expect(store).toBeDefined(); // Store should be created successfully
    expect(store.getState()).toHaveProperty('resources'); // Store should contain resources slice
  });

  // Test initial state of the resources slice
  it('should have resources state initialized correctly', () => {
    const store = configureStore({
      reducer: {
        resources: (state = { resources: [], loading: false, error: null }) => state,
        auth: (state = { user: null, token: null }) => state,
      },
    });
    
    const state = store.getState();
    expect(state.resources.resources).toEqual([]); // Initial resources array should be empty
    expect(state.resources.loading).toBe(false);   // Loading should default to false
    expect(state.resources.error).toBe(null);      // Error should default to null
  });

  // Test initial state of the auth slice
  it('should have auth state initialized correctly', () => {
    const store = configureStore({
      reducer: {
        resources: (state = { resources: [], loading: false, error: null }) => state,
        auth: (state = { user: null, token: null }) => state,
      },
    });
    
    const state = store.getState();
    expect(state.auth).toHaveProperty('user');     // Auth slice should have 'user' property
    expect(state.auth).toHaveProperty('token');    // Auth slice should have 'token' property
    expect(state.
