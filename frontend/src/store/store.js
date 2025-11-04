import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interviewSlice';
import resourceReducer from './slices/resourceSlice';

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,           // Manages authentication state
    interviews: interviewReducer, // Manages interview data and filters
    resources: resourceReducer,   // Manages questions, blogs, and categories
  },
});
