export interface IArticle {
    aktivan?: boolean;
    groupOfArticleName?: string;
    id: number;
    name: string;
    price: number;
    objectId: number;
    groupOfArticleId: number;
    image: string;
    note? : string;
    showMore? : boolean;
    allNote? : string
    priceString? : string;
    typeOfGroupArticleId: number;
    typeOfGroupArticleName?: string;

}
