import { Component, OnInit } from '@angular/core';
import { DataPersonajesService } from '../data-personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'] // corregí 'styleUrl' a 'styleUrls'
})
export class PersonajesComponent implements OnInit {

  personajes: any[] = [];
  totalPages: number = 42; // Total de páginas, ajusta si es necesario
  currentPage: number = 1;

  constructor(private personajesServicio: DataPersonajesService) { }

  // Método para obtener la imagen según la especie
  getImagenEspecie(species: string): string {
    switch (species) {
      case 'Human':
        return 'humano.png';
      case 'Alien':
        return 'alien.png';
      default:
        return 'especieDesconocida.png';
    }
  }
 
    getImagenEstado(estado: string): string{
      switch(estado){
        case 'Alive':
          return 'vivo.png';
        case 'Dead':
          return 'muerto.png';
        default:
          return 'niIdea.png';
      }
    }
    getImagenGenero(genero: string): string{
      switch(genero){
        case 'Male':
          return 'masculino.png';
        case 'Female':
          return 'femenino.png';
        default:
          return 'desconocido.png';
      }
    }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.loadPersonajes(this.currentPage);
  }

  // Método para cargar personajes de la página específica
  loadPersonajes(page: number): void {
    this.personajesServicio.getInformacionPersonajes(page).subscribe((data: any) => {
      this.personajes = data.results;
    });
  }

  // Manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPersonajes(page);
  }
}
