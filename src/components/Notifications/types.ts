export enum NotificationType {
    INFO,
    ERROR
}

export type Notification = {
    id: string,
    text: string,
    type: NotificationType
}