import { UserEnum } from './enums.js';

export type UserType = {
    name: string;
    email: string;
    avatarPath?: string;
    password: string;
    type: UserEnum;
}
