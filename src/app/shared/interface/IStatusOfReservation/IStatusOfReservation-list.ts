import {IStatusOfReservation } from "./IStatusOfReservation";
export interface IStatusOfReservationList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IStatusOfReservation[];
}
