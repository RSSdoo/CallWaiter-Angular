export interface IReservation {
    id: number;
    bearerOfReservation: string;
    date: Date;
    time: string;
    numberOfPerson: number;
    note: string;
    deskId: number;
    statusOfReservationId: number;
}
