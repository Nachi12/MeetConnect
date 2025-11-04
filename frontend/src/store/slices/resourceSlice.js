import { createSlice } from '@reduxjs/toolkit';

// Initial state for managing resources like questions and blogs
const initialState = {
  questions: [],          // Stores all question data
  blogs: [],              // Stores all blog data
  selectedCategory: 'frontend', // Default category filter
  loading: false,         // Indicates loading status
  currentPage: 1,         // Tracks pagination page
};

// Create Redux slice for resource management
const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    // Set all questions
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    // Set all blogs
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    // Update selected category and reset to first page
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    // Change the current page for pagination
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Toggle or set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export actions and reducer
export const { setQuestions, setBlogs, setCategory, setPage, setLoading } = resourceSlice.actions;
export default resourceSlice.reducer;
