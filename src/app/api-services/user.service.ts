import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interface/IUser/IUser';
import { IUserList } from '../shared/interface/IUser/IUser-list';
import { UserUpsertModel } from '../shared/models/user-upsert.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = environment.url + "admin"

  constructor(private http: HttpClient) { }
  GetAll() {
    return this.http.get<IUserList>(this.url);
  }
  Insert(component: UserUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<IUser>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: UserUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
