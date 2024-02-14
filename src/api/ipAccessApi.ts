import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IIpAccess, ModifyIpAccessRequest} from "../model/IpAccess.ts";
import {SESSION_ID_KEY} from "../helpers/RequireAuth.tsx";
import {eraseSession} from "../utils/securityUtils.ts";

export const ipAccessApi = createApi({
    reducerPath: 'ipAccessApi',
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
        getAllIpAccess: builder.query<IIpAccess[], void>({
            query: () => `ip`,
            transformErrorResponse: (
                response: { status: string | number },
                meta
            ) => {
                if (response.status == 'FETCH_ERROR' && meta?.response == undefined) {
                    eraseSession()
                }
            },
        }),
        updateIpAccess: builder.mutation<void, { id: string, data: ModifyIpAccessRequest }>({
            query: ({id, data}) => ({
                url: `ip/${id}`,
                method: 'PATCH',
                body: data
            }),
        })
    })
})

export const {useGetAllIpAccessQuery, useUpdateIpAccessMutation} = ipAccessApi;