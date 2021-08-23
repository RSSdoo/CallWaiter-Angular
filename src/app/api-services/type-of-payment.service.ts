import { HttpClient } from '@angular/common/http';
import { TypeofExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITypeOfPayment } from '../shared/interface/ITypeOfPayment/ITypeOfPayment';
import { ITypeOfPaymentList } from '../shared/interface/ITypeOfPayment/ITypeOfPayment-list';
import { TypeOfPaymentUpsertModel } from '../shared/models/typeOfPayment-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class TypeOfPaymentService {

  readonly url = environment.url + "typeOfPayment"

  constructor(private http: HttpClient) { }
  GetAll() {
    return this.http.get<ITypeOfPaymentList>(this.url);
  }
  Insert(component: TypeOfPaymentUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<ITypeOfPayment>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: TypeOfPaymentUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
