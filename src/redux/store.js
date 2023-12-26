import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // Fix the import statement here

const store = configureStore({
  reducer: rootReducer,
});

export default store;
