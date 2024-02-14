import {IUser} from "../../model/User.ts";
import {UserListEntry} from "../UserListEntry/UserListEntry.tsx";

type UserListTableProps = {
    userList: IUser[]
}

export const UserListTable = ({userList}: UserListTableProps) => (
    <table className="table">
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Telegram id</th>
            <th scope="col">Comment</th>
            <th scope="col">Active</th>
            <th scope="col">Approved</th>
        </tr>
        </thead>
        <tbody>
        {
            userList.map(entry => <UserListEntry user={entry} key={entry.id}/>)
        }
        </tbody>
    </table>
)