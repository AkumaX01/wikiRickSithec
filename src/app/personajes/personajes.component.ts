import { Component, OnInit } from '@angular/core';
import { DataPersonajesService } from '../data-personajes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  personajes: any[] = [];
  filteredPersonajes: any[] = [];
  totalPages: number = 42; // Total de páginas, ajusta si es necesario
  currentPage: number = 1;
  searchText: string = ''; // Variable para el texto del buscador
  loading: boolean = false; // Nueva variable para controlar la carga

  constructor(private personajesServicio: DataPersonajesService, private router: Router) { }

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
 
  getImagenEstado(estado: string): string {
    switch (estado) {
      case 'Alive':
        return 'vivo.png';
      case 'Dead':
        return 'muerto.png';
      default:
        return 'niIdea.png';
    }
  }
  
  getImagenGenero(genero: string): string {
    switch (genero) {
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
    this.loading = true; // Establece la carga en true antes de la solicitud
    this.personajesServicio.getInformacionPersonajes(page).subscribe((data: any) => {
      this.personajes = data.results;
      this.filterPersonajes(); // Filtrar personajes después de cargar los datos
      this.loading = false; // Establece la carga en false después de la solicitud
    }, error => {
      this.loading = false; // También establece la carga en false en caso de error
    });
  }

  // Filtrar personajes basados en el texto del buscador
  filterPersonajes(): void {
    if (!this.searchText.trim()) {
      this.filteredPersonajes = this.personajes;
    } else {
      this.filteredPersonajes = this.personajes.filter(personaje =>
        personaje.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  // Manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPersonajes(page);
  }

  // Manejar el cambio en el texto del buscador
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.filterPersonajes();
  }

  redirectToDetails(id: number): void {
    this.router.navigate(['/informacionPersonaje', id]);
  }
}
