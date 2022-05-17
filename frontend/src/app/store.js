import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import questReducer from '../features/quests/quest-slice';
import fieldReducer from '../features/quests/fields/field-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quests: questReducer,
    fields: fieldReducer,
  },
});
