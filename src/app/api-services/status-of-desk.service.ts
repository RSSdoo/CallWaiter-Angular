import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStatusOfDesk } from '../shared/interface/IStatusOfDesk/IStatusOfDesk';
import { IStatusOfDeskList } from '../shared/interface/IStatusOfDesk/IStatusOfDesk-list';
import { StatusOfDeskUpsertModel } from '../shared/models/statusOfDesk-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class StatusOfDeskService {

  readonly url = environment.url + "statusOfDesk"

  constructor(private http: HttpClient) { }
  GetAll() {
    return this.http.get<IStatusOfDeskList>(this.url);
  }
  Insert(component: StatusOfDeskUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IStatusOfDesk>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: StatusOfDeskUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
