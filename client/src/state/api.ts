import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { METHODS } from "http";
import { url } from "inspector";
import { Library } from "lucide-react";


export interface library {
    id: string;
    title: string;
    author: string;
    page: number;
    status: boolean;
}

export interface librarycomplete {
    id: string;
    title: string;
    author: string;
    status: boolean;
}

export interface DashboardMetrics {
    library: library[];
    librarycomplete: librarycomplete[];
}

export interface NewBook {
    title: string;
    author: string;
    page: number;
    status: boolean;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
      // Fetch dashboard metrics (list of books)
      getDashboardMetrics: build.query<library[], string | void>({
        query: (search) => ({
          url: "/dashboard",
          params: search ? { search } : {},
        }),
        providesTags: ["DashboardMetrics"],
      }),
  
      // Create a new book
      createBook: build.mutation<library, NewBook>({
        query: (newBook) => ({
          url: "/dashboard",
          method: "POST",
          body: newBook,
        }),
        invalidatesTags: ["DashboardMetrics"],
      }),

      deleteBook: build.mutation<void, string>({
        query: (id) => ({
          url: `/dashboard/${id}`, // Assuming the ID is used in the URL
          method: "DELETE",
        }),
        invalidatesTags: ["DashboardMetrics"],
      }),
  
      // Update an existing book
      updateBook: build.mutation<library, library>({
        query: (updatedBook) => ({
          url: `/dashboard/${updatedBook.id}`, // Assuming the ID is used in the URL
          method: "PUT",
          body: updatedBook,
        }),
        invalidatesTags: ["DashboardMetrics"],
      }),
    }),
  });


  
  // Export hooks for your endpoints
  export const { useGetDashboardMetricsQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = api;
  