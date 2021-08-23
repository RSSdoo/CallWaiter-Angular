import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISocialNetworkLinkList } from '../shared/interface/ISocialNetworkLink/ISocialNetwork-list';
import { SocialNetworkLinkUpsertModel } from '../shared/models/socialNetworkLink-upsert.model';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkLinkService {
  readonly url = environment.url + "SocialNetworkLink"
  constructor(private http: HttpClient) { }
  GetAll(pageNumber: number, search: string, objectId?: number, socialNetworkId?: number, getAllFilter?: boolean,) {
    let params = new Object();
    if (pageNumber != undefined) {
      params['pageNumber'] = pageNumber;
    }
    if (search != undefined) {
      params['searchFilter'] = search;
    }
    if(objectId != undefined){
      params['objectId'] = objectId;
    }
    if(socialNetworkId != undefined){
      params['socialNetworkId'] = socialNetworkId;
    }
    if(getAllFilter != undefined){
      params['getAllFilter']= getAllFilter
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return this.http.get<ISocialNetworkLinkList>(`${this.url}?${query}`);
  }
  Insert(component: SocialNetworkLinkUpsertModel) {
    return this.http.post(this.url, component);
  }
  GetById(id: number) {
    return this.http.get<ISocialNetworkLinkList>(this.url + "/" + id);
  }
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  Update(id: number, u: SocialNetworkLinkUpsertModel) {
    return this.http.put(this.url + "/" + id, u);
  }
}
