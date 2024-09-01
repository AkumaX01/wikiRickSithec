import { Component } from '@angular/core';
import { DataPersonajesService } from '../data-personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent {
  personajes: any[] = [];
  totalPages: number = 42; // Total de páginas, ajusta si es necesario debo de cambiar no olvidar
  currentPage: number = 1;
  constructor(private personajesServicio: DataPersonajesService) { }
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

  ngOnInit(): void {
    this.personajesServicio.getInformacionPersonajes().subscribe((data: any) => {
      this.personajes = data.results;
    });
  }
}
