import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IObject } from '../shared/interface/IObject/IObject';
import { IObjectList } from '../shared/interface/IObject/IObject-list';
import { ObjectUpsertModel } from '../shared/models/object-upsert.model';


@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  readonly url = environment.url + "object"

  constructor(private http: HttpClient) { }
  GetAll() {
    // let params = new Object();
    // if (pageNumber != undefined) {
    //   params['pageNumber'] = pageNumber;
    // }
    // if (search != undefined) {
    //   params['searchFilter'] = search;
    // }
    // const esc = encodeURIComponent;
    // const query = Object.keys(params)
    //   .map(k => esc(k) + '=' + esc(params[k]))
    //   .join('&');
    return this.http.get<IObjectList>(this.url);
  }
  Insert(component: ObjectUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IObject>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: ObjectUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
