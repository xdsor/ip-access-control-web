export interface IIpAccess {
    id: string;
    ip: string;
    isActive: boolean;
    createdAt: string;
    issuedFor: IIpAccessIssuedFor
}

export interface IIpAccessIssuedFor {
    id: string;
    telegramId: number;
    name: string;
    isActive: boolean;
}

export type ModifyIpAccessRequest = {
    ip: string;
    isActive: boolean
}
