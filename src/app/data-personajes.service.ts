import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPersonajesService {

  private apiUrl = 'https://rickandmortyapi.com/api/character/?page=1';

  constructor(private http: HttpClient) { }

  getInformacionPersonajes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
