import { ITypeOfGroupArticle } from "../ITypeOfGroupArticle/ITypeOfGroupArticle";

export interface IGroupOfArticle {
    id: number;
    nameOfGroup: string;
    objectId?: number;
    aktivan?: boolean; 
    types?: ITypeOfGroupArticle[];
}
