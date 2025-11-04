import { createSlice } from '@reduxjs/toolkit';

// Initial state for interview management
const initialState = {
  interviews: [],  // Stores list of interviews
  loading: false,  // Tracks loading state
  filter: 'all',   // Current filter type
};

// Create Redux slice for interview-related actions and reducers
const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    // Set the entire interviews list
    setInterviews: (state, action) => {
      state.interviews = action.payload;
    },
    // Add a new interview entry
    addInterview: (state, action) => {
      state.interviews.push(action.payload);
    },
    // Update the current filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Toggle or set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export actions and reducer
export const { setInterviews, addInterview, setFilter, setLoading } = interviewSlice.actions;
export default interviewSlice.reducer;
