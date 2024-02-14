import {IIpAccess} from "../../model/IpAccess.ts";
import {useUpdateIpAccessMutation} from "../../api/ipAccessApi.ts";
import {ChangeEvent} from "react";
import {formatDate} from "../../utils/dates.ts";
import {useAppDispatch} from "../../store/store.ts";
import {addNotification} from "../../store/notificationsSlice.ts";
import {NotificationType} from "../Notifications/types.ts";


type IpListEntryProps = {
    ipAccess: IIpAccess
}

export const IpListEntry = ({ipAccess}: IpListEntryProps) => {
    const [updateIpAccess] = useUpdateIpAccessMutation();
    const dispatch = useAppDispatch()
    const handleActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateIpAccess({
            id: ipAccess.id,
            data: {
                ip: ipAccess.ip,
                isActive: event.target.checked
            }
        }).unwrap()
            .then(() => {
                dispatch(addNotification({
                    id: crypto.randomUUID(),
                    text: `IpAccess ${ipAccess.ip} successfully updated!`,
                    type: NotificationType.INFO
                }))
            })
            .catch(() => {
                dispatch(addNotification({
                    id: crypto.randomUUID(),
                    text: `IpAccess ${ipAccess.ip} is not updated!`,
                    type: NotificationType.ERROR
                }))
            })
    }

    return (
        <tr>
            <th scope="row">{ipAccess.ip}</th>
            <td>{ipAccess.issuedFor.name}</td>
            <td>{formatDate(ipAccess.createdAt)}</td>
            <td>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        defaultChecked={ipAccess.isActive}
                        onChange={handleActiveChange}
                    />
                </div>
            </td>
        </tr>
    )
}