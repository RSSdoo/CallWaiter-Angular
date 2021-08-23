import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISubOfGroupDesk } from '../shared/interface/ISubOfGroupDesk/ISubOfGroupDesk';
import { ISubOfGroupDeskList } from '../shared/interface/ISubOfGroupDesk/ISubOfGroupDesk-list';
import { SubGroupOfDeskUpsertModel } from '../shared/models/subGroupOfDesk-upsert.model';



@Injectable({
  providedIn: 'root'
})
export class SubGroupOfDeskService {

  readonly url = environment.url + "subGroupOfDesk"

  constructor(private http: HttpClient) { }
  GetAll(getAllFilter :boolean) {
    return this.http.get<ISubOfGroupDeskList>(this.url + "?getAllFilter=" + getAllFilter);
  }
  Insert(component: SubGroupOfDeskUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<ISubOfGroupDesk>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: SubGroupOfDeskUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
