import { IStatusOfDesk } from "./IStatusOfDesk";

export interface IStatusOfDeskList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IStatusOfDesk[];
}
