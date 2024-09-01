import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.component.html',
  styleUrls: ['./localizacion.component.css']
})
export class LocalizacionComponent implements OnInit {
  episodio: any = {};
  personajes: any[] = [];
  private previousUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Guardar la URL previa antes de la navegación
        this.previousUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url = params.get('url');
      if (url) {
        this.obtenerEpisodio(url);
      }
    });
  }

  obtenerEpisodio(url: string): void {
    this.http.get(url).subscribe((data: any) => {
      this.episodio = data;
      this.obtenerPersonajes(data.residents);
    });
  }

  obtenerPersonajes(urls: string[]): void {
    const peticiones = urls.map(url => this.http.get(url));
    
    forkJoin(peticiones).subscribe((respuestas: any[]) => {
      this.personajes = respuestas;
    }, error => {
      console.error('Error al obtener personajes', error);
    });
  }

  irAtras(): void {
    if (this.previousUrl) {
      this.router.navigateByUrl(this.previousUrl);
    } else {
      this.router.navigate(['/personajes']); // Ruta por defecto si no hay URL previa
    }
  }
}
