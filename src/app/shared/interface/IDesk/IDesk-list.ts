import { IDesk } from "./IDesk";

export interface IDeskList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IDesk[];
}
