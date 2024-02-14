import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SESSION_ID_KEY} from "../helpers/RequireAuth.tsx";
import {IUser, UpdateUserRequest} from "../model/User.ts";
import {eraseSession} from "../utils/securityUtils.ts";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACK_END_URL,
        prepareHeaders: (headers) => {
            const sessionId = localStorage.getItem(SESSION_ID_KEY);
            if (sessionId) {
                headers.set("SESSION", sessionId)
            }
            headers.set("Content-type", "application/json")
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], void>({
            query: () => `users`,
            transformErrorResponse: (
                response: { status: string | number },
                meta
            ) => {
                if (response.status == 'FETCH_ERROR' && meta?.response == undefined) {
                    eraseSession()
                }
            },
        }),
        updateUser: builder.mutation<void, { id: string, data: UpdateUserRequest }>({
            query: ({id, data}) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: data
            })
        }),
        approveUser: builder.mutation<void, { id: string }>({
            query: ({id}) => ({
                url: `users/${id}/activate`,
                method: 'POST'
            })
        })
    })
})

export const {useGetAllUsersQuery, useApproveUserMutation, useUpdateUserMutation} = usersApi;