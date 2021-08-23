import { ITypeOfPayment } from "./ITypeOfPayment";

export interface ITypeOfPaymentList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: ITypeOfPayment[];
}
