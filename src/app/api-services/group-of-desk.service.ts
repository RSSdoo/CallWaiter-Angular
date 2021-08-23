import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGroupOfDesks } from '../shared/interface/IGroupOfDesk/IGroup-of-desks';
import { IGroupOfDesksList } from '../shared/interface/IGroupOfDesk/IGroup-of-desks-list';
import { GroupOfDeskUpsertModel } from '../shared/models/groupOfDesk-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class GroupOfDeskService {

  readonly url = environment.url + "groupOfDesk"

  constructor(private http: HttpClient) { }
  GetAll(pageNumber?: number, search?: string, getAllFilter?: boolean) {
    let params = new Object();
    if (pageNumber != undefined) {
      params['pageNumber'] = pageNumber;
    }
    if (search != undefined) {
      params['searchFilter'] = search;
    }
    if (getAllFilter != undefined) {
      params['getAllFilter'] = getAllFilter;
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<IGroupOfDesksList>(`${this.url}?${query}`);
  }
  Insert(component: GroupOfDeskUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IGroupOfDesks>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: GroupOfDeskUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
