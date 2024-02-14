import {NavLink} from "react-router-dom";
import {eraseSession} from "../../utils/securityUtils.ts";

export const Header = () => (
    <header className="mb-3">
        <div className="d-flex justify-content-between align-items-center">
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Ip Access</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/user">Users</NavLink>
                </li>
            </ul>
            <button className="btn btn-link" onClick={eraseSession}>Logout</button>
        </div>
    </header>
)