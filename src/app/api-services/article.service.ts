import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IArticle } from '../shared/interface/IArticle/IArticle';
import { IArticleList } from '../shared/interface/IArticle/IArticle-list';
import { ArticleUpsertModel } from '../shared/models/article-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  readonly url = environment.url + "article"
  // readonly url = "https://callwaiterwebapi20210823103751.azurewebsites.net/api/" + "article"

  constructor(private http: HttpClient) { }
  GetAll(pageNumber: number, search: string, groupOfArticleId?: number, objectId?: number, getAllFilter?: boolean,typeOfGroupArticleId? : number ) {
    let params = new Object();
    if (pageNumber != undefined) {
      params['pageNumber'] = pageNumber;
    }
    if (search != undefined) {
      params['searchFilter'] = search;
    }
    if(groupOfArticleId != undefined){
      params['groupOfArticleId'] = groupOfArticleId;
    }
    if(objectId != undefined){
      params['objectId'] = objectId;
    }
    if(getAllFilter != undefined){
      params['getAllFilter']= getAllFilter
    }
    if(typeOfGroupArticleId != undefined){
      params['typeOfGroupArticleId'] = typeOfGroupArticleId;
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<IArticleList>(`${this.url}?${query}`);
  }
  Insert(component: ArticleUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IArticle>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: ArticleUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
 
}
