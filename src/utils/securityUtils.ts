import {SESSION_ID_KEY} from "../helpers/RequireAuth.tsx";

export const eraseSession = () => {
    localStorage.removeItem(SESSION_ID_KEY)
    window.location.href = '/login'
}