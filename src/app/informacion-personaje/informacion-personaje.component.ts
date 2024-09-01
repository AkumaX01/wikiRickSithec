import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPersonajesService } from '../data-personajes.service';

@Component({
  selector: 'app-informacion-personaje',
  templateUrl: './informacion-personaje.component.html',
  styleUrls: ['./informacion-personaje.component.css']
})
export class InformacionPersonajeComponent implements OnInit {
  personaje: any;  // Variable para almacenar la información del personaje
  episodios: any[] = [];  // Variable para almacenar la información de los episodios

  constructor(
    private route: ActivatedRoute,
    private dataPersonajesService: DataPersonajesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.dataPersonajesService.getPersonajePorId(+id).subscribe(
        (data) => {
          this.personaje = data;
          this.cargarEpisodios(data.episode);
        },
        (error) => {
          console.error('Error al obtener el personaje:', error);
        }
      );
    }
  }

  cargarEpisodios(episodiosUrls: string[]): void {
    const episodiosIds = episodiosUrls.map(url => {
      const match = url.match(/\/episode\/(\d+)$/);
      return match ? +match[1] : null;
    }).filter(id => id !== null);

    if (episodiosIds.length > 0) {
      this.dataPersonajesService.getEpisodiosPorIds(episodiosIds).subscribe(
        (datosEpisodios) => {
          this.episodios = datosEpisodios;
        },
        (error) => {
          console.error('Error al obtener los episodios:', error);
        }
      );
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return date.toLocaleDateString();  // Puedes ajustar el formato según prefieras
  }
}
