import {IUser} from "../../model/User.ts";
import {useApproveUserMutation, useUpdateUserMutation} from "../../api/usersApi.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "../../store/store.ts";
import {addNotification} from "../../store/notificationsSlice.ts";
import {NotificationType} from "../Notifications/types.ts";

type UserListEntryProps = {
    user: IUser
}

export const UserListEntry = ({user}: UserListEntryProps) => {
    const [approveUser] = useApproveUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const dispatch = useAppDispatch()

    const handleUserApprove = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            approveUser({id: user.id}).unwrap()
                .then(() => {
                    dispatch(addNotification({
                        id: crypto.randomUUID(),
                        text: `User ${user.name} telegramId: ${user.telegramId} successfully approved!`,
                        type: NotificationType.INFO
                    }))
                })
                .catch(() => {
                    dispatch(addNotification({
                        id: crypto.randomUUID(),
                        text: `Could not approve user ${user.name} telegramId: ${user.telegramId}.`,
                        type: NotificationType.ERROR
                    }))
                })
        }
    }

    const handleChangeUserActiveFlag = (event: ChangeEvent<HTMLInputElement>) => {
        updateUser({
            id: user.id,
            data: {
                userComment: user.userComment,
                name: user.name,
                isActive: event.target.checked
            }
        }).unwrap()
            .then(() => {
                const activated = event.target.checked ? "activated" : "deactivated"
                dispatch(addNotification({
                    id: crypto.randomUUID(),
                    text: `User ${user.name} telegramId: ${user.telegramId} successfully ${activated}!`,
                    type: NotificationType.INFO
                }))
            })
            .catch(() => {
                dispatch(addNotification({
                    id: crypto.randomUUID(),
                    text: `Could not activate user ${user.name} telegramId: ${user.telegramId}.`,
                    type: NotificationType.ERROR
                }))
            })
    }

    return (
        <tr>
            <th scope="row">{user.name} {user.isApproved ? "" :
                <span className="badge text-bg-danger">Requests approval</span>} </th>
            <td>{user.telegramId}</td>
            <td>{user.userComment}</td>
            <td>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        defaultChecked={user.isActive}
                        disabled={!user.isApproved}
                        onChange={handleChangeUserActiveFlag}
                    />
                </div>
            </td>
            <td>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        defaultChecked={user.isApproved}
                        disabled={user.isApproved}
                        onChange={handleUserApprove}
                    />
                </div>
            </td>
        </tr>
    )
}