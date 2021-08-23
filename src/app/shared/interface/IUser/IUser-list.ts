import { IUser } from "./IUser";

export interface IUserList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IUser[];
}
