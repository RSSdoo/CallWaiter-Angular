import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDesk } from '../shared/interface/IDesk/IDesk';
import { DeskUpsertModel } from '../shared/models/desk-upsert.model';
import { IDeskList } from '../shared/interface/IDesk/IDesk-list';
import { IHistoryDeskList } from '../shared/interface/IHistoryDesk/IHistoryDesk-list';
import { IHistoryDesk } from '../shared/interface/IHistoryDesk/IHistoryDesk';
import { HistoryDeskUpsertModel } from '../shared/models/history-desk-upsert.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryDeskService {
  readonly url = environment.url + "HistoryOfDeskStatus";
  constructor(private http: HttpClient) { }

  GetAll(objectId: Number) {
    let params = new Object();
    if (objectId != undefined) {
      params['objectId'] = objectId;
    }
  
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<IHistoryDeskList>(`${this.url}?${query}`);
  }
  Insert(component: HistoryDeskUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IHistoryDesk>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: HistoryDeskUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
