import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITypeOfGroupArticleList } from '../shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle-list';
import { TypeOfGroupArticleUpsertModel } from 'src/app/shared/models/type-of-group-article-upsert.model';
import { ITypeOfGroupArticle } from '../shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle';


@Injectable({
  providedIn: 'root'
})
export class TypeOfGroupArticleService {

  readonly url = environment.url + "typeOfGroupArticle"

  constructor(private http: HttpClient) { }
  GetAll(groupOfArticleId?: number, objectId?: number) {
    let params = new Object()
    if(groupOfArticleId != undefined){
      params['groupOfArticleId']= groupOfArticleId 
    }
    if(objectId != undefined){
      params['objectId'] = objectId
    }
    params['getAllFilter'] = true;
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<ITypeOfGroupArticleList>(`${this.url}?${query}`);
  }
  Insert(component: TypeOfGroupArticleUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<ITypeOfGroupArticle>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: TypeOfGroupArticleUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
