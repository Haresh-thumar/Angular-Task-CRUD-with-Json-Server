import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _http: HttpClient) { }

  dataUrl: string = 'http://localhost:3000/signupUsersList';

  getLoginUserdata() {
    return this._http.get(this.dataUrl);
  }

}
