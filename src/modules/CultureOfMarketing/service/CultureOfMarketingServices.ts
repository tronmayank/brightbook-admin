import apiSlice from "src/services/ApiSlice";

export const ComApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getCom: builder.query({
      providesTags: ["com"],
      query: (body) => {
        return {
          url: "/artical/pagination",
          method: "GET",
          params: body,
        };
      },
    }),

    // Get By Id
    getByIdArticle: builder.query({
      providesTags: ["com"],
      query: (id) => {
        return {
          url: `/artical/${id}`,
          method: "GET",
        };
      },
    }),

    // Add
    addCom: builder.mutation({
      invalidatesTags: ["com"],
      query: (body) => {
        return {
          url: "/artical/add",
          method: "POST",
          body,
        };
      },
    }),

    // update
    updateArticle: builder.mutation({
      invalidatesTags: ["com"],
      query: ({ id, body }) => {
        return {
          url: `/artical/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

  }),
});

export const { useGetComQuery, useGetByIdArticleQuery, useAddComMutation, useUpdateArticleMutation } = ComApi;
