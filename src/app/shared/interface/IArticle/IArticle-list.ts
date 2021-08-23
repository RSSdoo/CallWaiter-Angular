import { IArticle } from "./IArticle";

export interface IArticleList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IArticle[];
}
