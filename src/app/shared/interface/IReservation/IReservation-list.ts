import { IReservation } from "./IReservation";
export interface IReservationList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IReservation[];
}
