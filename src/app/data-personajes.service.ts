import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataPersonajesService {

  private apiUrl = 'https://rickandmortyapi.com/api/character/';
  private apiUrlEpisodio = 'https://rickandmortyapi.com/api/episode/';

  // Variables para almacenar el número total de páginas y personajes
  private totalPages: number = 0;
  private totalCharacters: number = 0;


  constructor(private http: HttpClient) { }

  // Método que recibe el número de página y obtiene los personajes de esa página
  getInformacionPersonajes(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      tap(response => {
        // Guardar el número total de páginas y personajes en las variables
        this.totalPages = response.info.pages;
        this.totalCharacters = response.info.count;
      })
    );
  }

  // Método que recibe el ID del personaje y obtiene sus datos
  getPersonajePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  // Método para obtener información de episodios por IDs
  getEpisodiosPorIds(ids: number[]): Observable<any[]> {
    // Construir la URL para múltiples episodios
    const idsStr = ids.join(',');
    return this.http.get<any[]>(`${this.apiUrlEpisodio}${idsStr}`);
  }

  // Métodos para obtener el número total de páginas y personajes
  getTotalPages(): number {
    return this.totalPages;
  }

  getTotalCharacters(): number {
    return this.totalCharacters;
  }
}
