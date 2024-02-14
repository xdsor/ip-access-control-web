import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Notification} from "../components/Notifications/types.ts";

export interface NotificationsState {
    notifications: Notification[]
}

const initialState = { notifications: [] } as NotificationsState

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state: NotificationsState, action: PayloadAction<Notification>) {
            state.notifications = state.notifications.concat(action.payload)
        },
        deleteNotification(state: NotificationsState, action: PayloadAction<Notification>) {
            state.notifications = state.notifications.filter(notification => notification.id != action.payload.id)
        },
    },
})

export const { addNotification, deleteNotification } = notificationsSlice.actions
export default notificationsSlice.reducer