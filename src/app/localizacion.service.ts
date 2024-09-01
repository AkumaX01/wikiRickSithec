import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor(private http: HttpClient) {}

  // Método para obtener los detalles de una ubicación dada una URL
  obtenerUbicacion(ubicacionUrl: string): Observable<any> {
    return this.http.get(ubicacionUrl).pipe(
      catchError(error => {
        console.error('Error al obtener ubicación:', error);
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

  // Método para obtener ubicación y sus personajes en una sola llamada
  obtenerUbicacionConPersonajes(ubicacionUrl: string): Observable<any> {
    return this.obtenerUbicacion(ubicacionUrl).pipe(
      map(ubicacion => {
        if (ubicacion && ubicacion.residents) {
          return this.obtenerPersonajes(ubicacion.residents).pipe(
            map(personajes => ({
              ubicacion,
              personajes
            }))
          );
        } else {
          return of({ ubicacion, personajes: [] });
        }
      }),
      catchError(error => {
        console.error('Error al obtener ubicación con personajes:', error);
        return of({ ubicacion: null, personajes: [] });
      })
    );
  }
}
