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
  allCustomers: safelyParseJSON(localStorage.getItem('allCustomers')),
  allTraders: safelyParseJSON(localStorage.getItem('allTraders')),
  allTradersTotalCount: safelyParseJSON(
    localStorage.getItem('allTradersTotalCount')
  ),
  allTransactions: safelyParseJSON(localStorage.getItem('allTransactions')),
  allTransactionsTotalCount: safelyParseJSON(
    localStorage.getItem('allTransactionsTotalCount')
  ),
  allCustomersTotalCount: safelyParseJSON(
    localStorage.getItem('allCustomersTotalCount')
  ),

  singleCustomerDetails: safelyParseJSON(
    localStorage.getItem('singleCustomerDetails')
  ),
  singleTraderDetails: safelyParseJSON(
    localStorage.getItem('singleTraderDetails')
  ),

  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getAllCustomersSuccess(state, action) {
      const { customers, totalCount } = action.payload;
      state.allCustomers = customers;
      state.allCustomersTotalCount = totalCount;

      localStorage.setItem('allCustomers', JSON.stringify(state.allCustomers));
      localStorage.setItem(
        'allCustomersTotalCount',
        JSON.stringify(state.allCustomersTotalCount)
      );
    },

    getAllTransactionsSuccess(state, action) {
      const { transactions, totalTransactionsCount } = action.payload;
      state.allTransactions = transactions;
      state.allTransactionsTotalCount = totalTransactionsCount;

      localStorage.setItem(
        'allTransactions',
        JSON.stringify(state.allTransactions)
      );
      localStorage.setItem(
        'allTransactionsTotalCount',
        JSON.stringify(state.allTransactionsTotalCount)
      );
    },

    getAllTokenTransactionsSuccess(state, action) {
      const { traders, totalCount } = action.payload;
      state.allTraders = traders;
      state.allTradersTotalCount = totalCount;

      localStorage.setItem('allTraders', JSON.stringify(state.allTraders));
      localStorage.setItem(
        'allTradersTotalCount',
        JSON.stringify(state.allTradersTotalCount)
      );
    },

    getAllTradersSuccess(state, action) {
      const { traders, totalCount } = action.payload;
      state.allTraders = traders;
      state.allTradersTotalCount = totalCount;

      localStorage.setItem('allTraders', JSON.stringify(state.allTraders));
      localStorage.setItem(
        'allTradersTotalCount',
        JSON.stringify(state.allTradersTotalCount)
      );
    },

    getSingleTraderSuccess(state, action) {
      state.singleTraderDetails = action.payload;
      console.log('state.singleTraderDetails', state.singleTraderDetails);
    },

    getSingleCustomerSuccess(state, action) {
      state.singleCustomerDetails = action.payload;
    },

    clearAdmin(state) {
      state.allCustomers = null;
      state.allTraders = null;
      state.allTransactions = null;
      state.allTransactionsTotalCount = null;
      state.allTradersTotalCount = null;
      state.allCustomersTotalCount = null;
      state.singleCustomerDetails = null;
      state.singleTraderDetails = null;
      state.loading = false;

      localStorage.removeItem('allCustomers');
      localStorage.removeItem('allTransactions');
      localStorage.removeItem('allTraders');
      localStorage.removeItem('allTransactionsTotalCount');
      localStorage.removeItem('allTradersTotalCount');
      localStorage.removeItem('allCustomersTotalCount');
      localStorage.removeItem('singleCustomerDetails');
      localStorage.removeItem('singleTraderDetails');
      state.error = null;
    },
  },
});

export const {
  getAllTokenTransactionsSuccess,
  clearAdmin,
  getSingleTraderSuccess,
  getSingleCustomerSuccess,
  getAllTradersSuccess,
  getAllCustomersSuccess,
  getAllTransactionsSuccess,
  // updateUser,
  // removeUser,
  // loadingStop,
} = adminSlice.actions;

export default adminSlice.reducer;
