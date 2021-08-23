export class DeskUpsertModel{
    constructor(public groupOfDeskId: number,public subGroupOfDeskId: number, public numberOfDesk: string, public statusOfDeskId: number, 
        public objectId: number, public aktivan?: boolean, public numberOfSeats? : number,public startTime?: Date, public TypeOfPaymentId?: number ){}
}