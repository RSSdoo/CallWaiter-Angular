import { ITypeOfGroupArticle } from "./ITypeOfGroupArticle";

export interface ITypeOfGroupArticleList{
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: ITypeOfGroupArticle[];
}   