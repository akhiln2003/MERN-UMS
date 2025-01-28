import { apiSlice } from "../apiSlice";

const ADMIN_URL = "/api/admin";

const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authadmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    fetchusers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/dashbord`,
        method: "GET",
      }),
    }),
    deleteuser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/editUser/${id}`,
        method: "DELETE",
      }),
    }),
    createuser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/createuser`,
        method: "POST",
        body: data,
      }),
    }),
    edituser:builder.mutation({
      query: ({data , id}) => ({
        url: `${ADMIN_URL}/editUser/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    logoutadmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAuthadminMutation,
  useFetchusersQuery,
  useDeleteuserMutation,
  useCreateuserMutation,
  useEdituserMutation,
  useLogoutadminMutation
} = adminApiSlice;