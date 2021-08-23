import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStatusOfReservation } from '../shared/interface/IStatusOfReservation/IStatusOfReservation';
import { IStatusOfReservationList } from '../shared/interface/IStatusOfReservation/IStatusOfReservation-list';
import { StatusOfReservationUpsertModel } from '../shared/models/statusOfReservation-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class StatusOfReservationService {

  readonly url = environment.url + "statusOfReservation"

  constructor(private http: HttpClient) { }
  GetAll() {
    return this.http.get<IStatusOfReservationList>(this.url);
  }
  Insert(component: StatusOfReservationUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IStatusOfReservation>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: StatusOfReservationUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
