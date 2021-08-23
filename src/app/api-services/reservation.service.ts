import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReservation } from '../shared/interface/IReservation/IReservation';
import { IReservationList } from '../shared/interface/IReservation/IReservation-list';
import { ReservationUpsertModel } from '../shared/models/reservation-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  readonly url = environment.url + "reservation"

  constructor(private http: HttpClient) { }
  GetAll(pageNumber: number, search: string) {
    let params = new Object();
    if (pageNumber != undefined) {
      params['pageNumber'] = pageNumber;
    }
    if (search != undefined) {
      params['searchFilter'] = search;
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  
    return this.http.get<IReservationList>(`${this.url}?${query}`);
  }
  Insert(component: ReservationUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IReservation>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: ReservationUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }

}
