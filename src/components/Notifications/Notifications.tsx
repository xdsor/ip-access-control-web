import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import classNames from 'classnames';
import {deleteNotification} from "../../store/notificationsSlice.ts";
import {NotificationType, Notification} from "./types.ts";

export const Notifications = () => {
    const notifications = useAppSelector((selector) => selector.notifications.notifications)
    const dispatch = useAppDispatch()

    const handleMouseEnter = (notification: Notification) => {
        dispatch(deleteNotification(notification))
    }
    return (
        <>
            {notifications.length > 0 && <ul>
                {notifications.map(notification => (
                        <div key={notification.id} className={classNames({
                            alert: true,
                            'alert-success': notification.type == NotificationType.INFO,
                            'alert-danger': notification.type == NotificationType.ERROR
                        })}
                             role="alert"
                             onMouseEnter={() => handleMouseEnter(notification)}
                        >
                            {notification.text}
                        </div>
                    )
                )}
            </ul>}
        </>
    )
}