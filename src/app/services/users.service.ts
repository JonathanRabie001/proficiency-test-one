import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private _http: HttpClient
  ) { }

  public createUser(user: any): Observable<any> {
    return this._http.post(`${environment.apiBase}/users`, user);
  }
}
