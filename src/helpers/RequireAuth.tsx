import {ReactNode} from "react";
import {Navigate} from "react-router-dom";

export const SESSION_ID_KEY: string = "sessionId"

export const RequireAuth = ({children}: {children: ReactNode}) => {
    const sessionToken: string | null = localStorage.getItem(SESSION_ID_KEY);
    if (!sessionToken) {
        return <Navigate to="/login" replace />
    }
    return children;
}