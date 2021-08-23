import { IObject } from "./IObject";
export interface IObjectList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IObject[];
}
