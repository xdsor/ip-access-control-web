import {Outlet} from "react-router-dom";
import {Header} from "../layout/Header/Header.tsx";
import {Notifications} from "../components/Notifications/Notifications.tsx";

export default function RoutesRoot() {
    return (
        <div className='container'>
            <Header/>
            <Notifications/>
            <Outlet/>
        </div>
    );
}