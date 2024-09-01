import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataPersonajesService {

  private apiUrl = 'https://rickandmortyapi.com/api/character/';
  private apiUrlEpisodio = 'https://rickandmortyapi.com/api/episode/';

  private totalPaginasS = new BehaviorSubject<number>(0);
  totalPaginas$ = this.totalPaginasS.asObservable();

  private totalPersonajesS = new BehaviorSubject<number>(0);
  totalPersonajes$ = this.totalPersonajesS.asObservable();

  constructor(private http: HttpClient) { }

  getInformacionPersonajes(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      tap(response => {
        this.totalPaginasS.next(response.info.pages);
        this.totalPersonajesS.next(response.info.count)
      })
    );
  }
  //Para mostrar la informacion de un personaje en especifico hago la llamada a la api con el id del personaje
  getPersonajePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  //cuando muestro la informaciond de un personaje hago otra llamada a la api para saber en que episodios aparecio
  getEpisodiosPorIds(ids: number[]): Observable<any[]> {
    const idsStr = ids.join(',');
    return this.http.get<any[]>(`${this.apiUrlEpisodio}${idsStr}`);
  }
}
