export interface IUser {
    id: string;
    telegramId: number;
    userComment: string;
    name: string;
    isActive: boolean;
    isApproved: boolean;
}

export type UpdateUserRequest = {
    userComment: string;
    name: string;
    isActive: boolean;
}