import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDesk } from '../shared/interface/IDesk/IDesk';
import { DeskUpsertModel } from '../shared/models/desk-upsert.model';
import { IDeskList } from '../shared/interface/IDesk/IDesk-list';

@Injectable({
  providedIn: 'root'
})
export class DeskService {
  readonly url = environment.url + "desk";
  constructor(private http: HttpClient) { }

  GetAll(page?: number, search?: string, getAllFilter? : boolean, objectId? : number) {
    let params = new Object();
    if (page != undefined) {
      params['pageNumber'] = page;
    }
    if (search != undefined) {
      params['searchFilter'] = search;
    }
    if(getAllFilter != undefined){
      params['getAllFilter'] = getAllFilter;
    }
    if(objectId != undefined){
      params['objectId'] = objectId;
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<IDeskList>(`${this.url}?${query}`);
  }
  Insert(component: DeskUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IDesk>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: DeskUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
