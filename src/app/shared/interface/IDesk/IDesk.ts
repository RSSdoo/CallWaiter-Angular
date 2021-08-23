export interface IDesk {
    typeOfPaymentName?: string;
    numberOfSeats: number;
    aktivan: boolean;
    id: number;
    numberOfDesk: string;
    groupOfDeskId: number;
    subGroupOfDeskId: number;
    objectId: number;
    nameOfGroup?: string;
    nameOfSubGroup?: string;
    statusOfDeskId: number;
    qrCode: string;
    typeOfPaymentId : number
    startTime: Date;
}

