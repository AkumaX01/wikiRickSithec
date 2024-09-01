import { Component, OnInit } from '@angular/core';
import { DataPersonajesService } from '../data-personajes.service';
import { SeleccionarImagenService } from '../seleccionar-imagen.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  personajes: any[] = [];
  filteredPersonajes: any[] = [];
  totalPages: number = 0; // Total de páginas en el constructor obtenemos el valor desde un servicio
  totalPersonajes: number=0;
  paginaActual: number = 1;
  searchText: string = ''; // Variable para el texto del buscador
  loading: boolean = false; // Nueva variable para controlar la carga

  constructor(private personajesServicio: DataPersonajesService, private router: Router, private seleccionarImagenServicio: SeleccionarImagenService) { }

  // Método para obtener la imagen correspondiente a la especie
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

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.loadPersonajes(this.paginaActual);
     // Suscribirse a totalPages$ para obtener el número total de páginas
     this.personajesServicio.totalPaginas$.subscribe(pages => {
      this.totalPages = pages;
    });
    this.personajesServicio.totalPersonajes$.subscribe(personajes => {
      this.totalPersonajes = personajes;
    });
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
    this.paginaActual = page;
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
