import { Byte } from "@angular/compiler/src/util";

export class ArticleUpsertModel{
    constructor(public name: string,public price: number, public objectId: number, public groupOfArticleId: number, public typeOfGroupArticleId: number, public image?: string, public aktivan?: boolean, public note?: string){}
}