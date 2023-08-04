import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategory } from '../api/types';

interface ICategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: ICategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  initialState,
  name: 'category',
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
