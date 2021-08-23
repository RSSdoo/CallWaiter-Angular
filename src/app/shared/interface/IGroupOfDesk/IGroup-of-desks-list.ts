import { IGroupOfDesks } from "./IGroup-of-desks";


export interface IGroupOfDesksList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IGroupOfDesks[];

}
