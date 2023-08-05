import { configureStore } from '@reduxjs/toolkit';
import reducer from '../features/Notes/noteSlice'

export const store = configureStore({ reducer: reducer })