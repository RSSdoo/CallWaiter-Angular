import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDeskList } from '../shared/interface/IDesk/IDesk-list';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = environment.url + "admin";
  constructor(private http: HttpClient) { }

  // GetAll(pageNumber: number, search: string) {
  //   let params = new Object();
  //   if (pageNumber != undefined) {
  //     params['pageNumber'] = pageNumber;
  //   }
  //   if (search != undefined) {
  //     params['searchFilter'] = search;
  //   }
  //   const esc = encodeURIComponent;
  //   const query = Object.keys(params)
  //     .map(k => esc(k) + '=' + esc(params[k]))
  //     .join('&');
  //   return this.http.get<IDeskList>(`${this.url}?${query}`);
  // }
  // Insert(component: DeskUpsertModel) {
  //   return this.http.post(this.url, component);
  // }
  login() {
    return this.http.get<IUser>(this.url);
  }
  get(userName?:string){
    if(userName){
      return this.http.get<IUser>(this.url +"?username="+ userName);
    }
    return this.http.get<IUser>(this.url );
  }
}
interface IUser{
  listOfObject: IList[];
  objectId: number;
}
interface IList{
  objectId : number
  username: string;
}
