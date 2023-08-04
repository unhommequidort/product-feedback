import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCategories } from '../features/categorySlice';

import { ICategory } from './types';

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

// export const categoryApi = createApi({
//   reducerPath: 'categoryApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${BASE_URL}/api/category`,
//   }),
//   tagTypes: ['Category'],
//   endpoints: (builder) => ({
//     getCategories: builder.query<ICategory[], null>({
//       query() {
//         return {
//           url: '',
//         };
//       },
//       transformResponse: (response: { data: { categories: ICategory[] } }) =>
//         response.data.categories,
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           console.log(await queryFulfilled);
//           console.log(data);
//           dispatch(setCategories(data));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   }),
// });

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/category`,
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], null>({
      query() {
        return {
          url: '',
        };
      },
      transformResponse: (response: { data: ICategory[] }) => response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategories(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
