import { IHistoryDesk } from "./IHistoryDesk";

export interface IHistoryDeskList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IHistoryDesk[];
}
