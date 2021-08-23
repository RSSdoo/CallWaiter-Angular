import { IGroupOfArticle } from "./IGroupOfArticle";
export interface IGroupOfArticleList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: IGroupOfArticle[];
}
