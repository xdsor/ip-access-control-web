import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {UsersView} from "./view/Users/UsersView.tsx";
import RoutesRoot from "./helpers/RoutesRoot.tsx";
import {IpAccessView} from "./view/IpAccess/IpAccessView.tsx";
import {LoginView} from "./view/Login/LoginView.tsx";
import {RequireAuth} from "./helpers/RequireAuth.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><RoutesRoot/></RequireAuth>,
        children: [
            {
                path: "/",
                element: <IpAccessView/>
            },
            {
                path: "/user",
                element: <UsersView/>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginView />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
