import {FormEvent} from "react";
import axios from 'axios';
import {SESSION_ID_KEY} from "../../helpers/RequireAuth.tsx";
import {useNavigate} from "react-router-dom";
import "./login.css"

type LoginFormData = {
    username: { value: string },
    password: { value: string }
}

class LoginRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export const LoginView = () => {
    const navigate = useNavigate()

    const submit = async (e: FormEvent) => {
        const target = e.target as typeof e.target & LoginFormData;
        e.preventDefault();
        await makeLoginRequest(target.username.value, target.password.value);
    }

    const makeLoginRequest = async (username: string, password: string) => {
        const loginRequest = new LoginRequest(username, password);
        const response = await axios.post(`${import.meta.env.VITE_BACK_END_URL}/login`, loginRequest);
        const sessionId: string | undefined = response.headers.session
        if (sessionId) {
            localStorage.setItem(SESSION_ID_KEY, sessionId)
            navigate('/')
        }
    }

    return (
            <main className="form-signin w-100 m-auto">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" name="username" id="login-username" placeholder="root"/>
                        <label htmlFor="login-username">Login</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="password" name="password" id="login-password" placeholder="root"/>
                        <label htmlFor="login-password">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
                </form>
            </main>
    )
}