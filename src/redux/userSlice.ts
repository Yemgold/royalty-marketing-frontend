import { createSlice } from '@reduxjs/toolkit';

// Safely parse JSON to avoid errors
const safelyParseJSON = (item: string | null) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState = {
  currentUser: safelyParseJSON(localStorage.getItem('currentUser')),
  access: safelyParseJSON(localStorage.getItem('access')),
  refreshToken: safelyParseJSON(localStorage.getItem('refreshToken')),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },

    loginSuccess(state, action) {
      state.loading = false;
      console.log('payload:', action.payload);
      const { user, accessToken, refreshToken } = action.payload;
      state.currentUser = user;
      state.access = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('access', JSON.stringify(state.access));
      localStorage.setItem('refreshToken', JSON.stringify(state.refreshToken));
    },

    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearUser(state) {
      state.loading = false;
      state.currentUser = null;
      state.access = null;
      state.refreshToken = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      localStorage.removeItem('refreshToken');
      state.error = null;
    },

    updateUser(state, action) {
      state.loading = false;

      const { user } = action.payload;
      state.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },
  },
});

export const {
  clearUser,
  updateUser,
  loginStart,
  loginSuccess,
  loginFailure,
  loadingStop,
} = userSlice.actions;

export default userSlice.reducer;
