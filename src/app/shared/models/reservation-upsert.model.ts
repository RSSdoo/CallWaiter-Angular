export class ReservationUpsertModel{
     constructor(public bearerOfReservation: string, public date: Date, public time: string, public numberOfPerson: number, 
        public note: string, 
        public deskId: number,
        public statusOfReservationId: number
         ){}
}