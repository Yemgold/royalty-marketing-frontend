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
  allMyCustomersForTokenApproval: safelyParseJSON(
    localStorage.getItem('allMyCustomersForTokenApproval')
  ),

  allMyCustomersForTokenApprovalTotalCount: safelyParseJSON(
    localStorage.getItem('allMyCustomersForTokenApprovalTotalCount')
  ),

  loading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getCustomersForTokenConfirmationSuccess(state, action) {
      const { data, totalCount } = action.payload;
      state.allMyCustomersForTokenApproval = data;
      state.allMyCustomersForTokenApprovalTotalCount = totalCount;

      localStorage.setItem(
        'allMyCustomersForTokenApproval',
        JSON.stringify(state.allMyCustomersForTokenApproval)
      );
      localStorage.setItem(
        'allMyCustomersForTokenApprovalTotalCount',
        JSON.stringify(state.allMyCustomersForTokenApprovalTotalCount)
      );
    },

    clearSlice(state) {
      state.allMyCustomersForTokenApproval = null;

      state.allMyCustomersForTokenApprovalTotalCount = null;

      state.loading = false;
      localStorage.removeItem('allMyCustomersForTokenApprovalTotalCount');
      localStorage.removeItem('allMyCustomersForTokenApproval');
      state.error = null;
    },
  },
});

export const {
  clearSlice,
  getCustomersForTokenConfirmationSuccess,

  // updateUser,
  // removeUser,
  // loadingStop,
} = tokenSlice.actions;

export default tokenSlice.reducer;
