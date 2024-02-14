import {UserListTable} from "../../components/UserListTable/UserListTable.tsx";
import {useGetAllUsersQuery} from "../../api/usersApi.ts";

export const UsersView = () => {
    const {data = []} = useGetAllUsersQuery();
    return (
        <>
            <h1>User list</h1>
            {data.length == 0 ? <div>Nothing to display</div>
                : <UserListTable userList={data}/>}
        </>
    )
}