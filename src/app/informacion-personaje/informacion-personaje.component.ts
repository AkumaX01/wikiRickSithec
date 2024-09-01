import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPersonajesService } from '../data-personajes.service';
import { SeleccionarImagenService } from '../seleccionar-imagen.service';

@Component({
  selector: 'app-informacion-personaje',  
  templateUrl: './informacion-personaje.component.html', 
  styleUrls: ['./informacion-personaje.component.css']  
})
export class InformacionPersonajeComponent implements OnInit {
  personaje: any;  // Variable para almacenar la información del personaje obtenido desde el servicio
  episodios: any[] = [];  // Variable para almacenar la información de los episodios asociados al personaje
  isFeaturedInVisible = true;
  constructor(
    private route: ActivatedRoute,  // Servicio para acceder a los parámetros de la ruta activa
    private dataPersonajesService: DataPersonajesService,  // Servicio personalizado para obtener datos desde una API
    private seleccionarImagenServicio: SeleccionarImagenService
    
  ) { }

  ngOnInit(): void {
    // Obtiene el paraetro 'id' de la URL usando ActivatedRoute
    const id = this.route.snapshot.paramMap.get('id');

    // Verifica si se ha obtenido un ID volido
    if (id) {
      // Llama al servicio para obtener la informacion del personaje por su ID
      this.dataPersonajesService.getPersonajePorId(+id).subscribe(
        (data) => {
          this.personaje = data;  // Asigna la informacion del personaje a la variable 'personaje'
          this.cargarEpisodios(data.episode);  // se llama a los episodios asociados al personaje
        },
        (error) => {
          console.error('Error al obtener el personaje:', error);  // Manejo de errores
        }
      );
    }
  }

  cargarEpisodios(episodiosUrls: string[]): void {
    // Mapea las URLs de episodios para extraer los IDs usando una expresión regular
    const episodiosIds = episodiosUrls.map(url => {
      const match = url.match(/\/episode\/(\d+)$/);  // Busca el numero de episodio en la URL
      return match ? +match[1] : null;  // Devuelve el ID del episodio o null si no coincide
    }).filter(id => id !== null);  // Filtra los valores nulos

    // Verifica si se encontraron IDs de episodios validos
    if (episodiosIds.length > 0) {
      // Llama al servicio para obtener los episodios por sus IDs
      this.dataPersonajesService.getEpisodiosPorIds(episodiosIds).subscribe(
        (datosEpisodios) => {
          // Verifica si datosEpisodios es un array, de lo contrario, lo convierte en uno (hacer mas pruebas de la funcionalidad del componente, no se te olvide Hector)
          this.episodios = Array.isArray(datosEpisodios) ? datosEpisodios : [datosEpisodios];
        },
        (error) => {
          console.error('Error al obtener los episodios:', error);  // Manejo de errores
        }
      );
    } else {
      console.error('No se encontraron episodios válidos.');  // Manejo del caso en que no hay episodios válidos
    }
  }

  formatDate(dateString: string | undefined): string {
    // Si no hay una fecha proporcionada, devuelve 'Unknown Date'
    if (!dateString) return 'Unknown Date';
    
    const date = new Date(dateString);  // Convierte la cadena de fecha en un objeto Date
    return date.toLocaleDateString();  // Devuelve la fecha formateada segun la configuración regional
  }
  getImagenEspecie(species: string): string {
    return this.seleccionarImagenServicio.getImagenEspecie(species);
  }

  // Método para obtener la imagen correspondiente al estado
  getImagenEstado(estado: string): string {
    return this.seleccionarImagenServicio.getImagenEstado(estado);
  }

  // Método para obtener la imagen correspondiente al género
  getImagenGenero(genero: string): string {
    return this.seleccionarImagenServicio.getImagenGenero(genero);
  }
  toggleFeaturedIn() {
    this.isFeaturedInVisible = !this.isFeaturedInVisible;
  }
}
