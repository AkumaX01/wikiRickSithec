import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EpisodioDataService {

  constructor(private http: HttpClient) {}

  // Método para obtener los detalles de un episodio dado una URL
  obtenerEpisodio(episodioUrl: string): Observable<any> {
    return this.http.get(episodioUrl).pipe(
      catchError(error => {
        console.error('Error al obtener episodio:', error);
        return of(null);  // Retorna null si ocurre un error
      })
    );
  }

  // Método para obtener los detalles de los personajes dado un array de URLs
  obtenerPersonajes(urls: string[]): Observable<any[]> {
    if (!urls || urls.length === 0) {
      // Retorna un Observable vacío si no hay URLs
      return of([]);
    }

    // Usar forkJoin para manejar múltiples observables
    const peticiones = urls.map(url => this.http.get(url).pipe(
      catchError(error => {
        console.error('Error al obtener personaje:', error);
        return of(null);  // Retorna null si ocurre un error
      })
    ));
    return forkJoin(peticiones).pipe(
      map(respuestas => respuestas.filter(respuesta => respuesta !== null))
    );
  }

  // Método para obtener un episodio y sus personajes en una sola llamada
  obtenerEpisodioConPersonajes(episodioUrl: string): Observable<any> {
    return this.obtenerEpisodio(episodioUrl).pipe(
      switchMap(episodio => {
        if (episodio && episodio.characters) {
          return this.obtenerPersonajes(episodio.characters).pipe(
            map(personajes => ({
              episodio,
              personajes
            }))
          );
        } else {
          return of({ episodio, personajes: [] });
        }
      }),
      catchError(error => {
        console.error('Error al obtener episodio con personajes:', error);
        return of({ episodio: null, personajes: [] });
      })
    );
  }
}
