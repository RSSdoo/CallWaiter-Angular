import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGroupOfArticle } from '../shared/interface/IGroupOfArticle/IGroupOfArticle';
import { IGroupOfArticleList } from '../shared/interface/IGroupOfArticle/IGroupOfArticle-list';
import { GroupOfArticleUpsertModel } from '../shared/models/groupOfArticle-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class GroupOfArticleService {

  readonly url = environment.url + "groupOfArticle"

  constructor(private http: HttpClient) { }
  GetAll(pageNumber?: number, search?: string, objectId?: number) {
    let params = new Object();
    if (pageNumber != undefined) {
      params['pageNumber'] = pageNumber;
    }
    if (search != undefined) {
      params['searchFilter'] = search;
    }
    if(objectId != undefined){
      params['objectId'] = objectId;
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<IGroupOfArticleList>(`${this.url}?${query}`);
  }
  Insert(component: GroupOfArticleUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IGroupOfArticle>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: GroupOfArticleUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
