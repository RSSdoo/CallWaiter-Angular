import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateQrcodeService {
  readonly url = environment.url + "GenerateQRCode";
  constructor(private http: HttpClient) { }

  Get(url: string) {
    let params = new Object();
    if (url != undefined) {
      params['url'] = url;
    }
    const esc = encodeURIComponent;
    const query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k]))
    return this.http.get<string>(`${this.url}?${query}`);
  }
}
