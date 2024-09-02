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
  isDarkMode = true;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  personajes: any[] = [];
  filteredPersonajes: any[] = [];
  totalPages: number = 0;
  totalPersonajes: number = 0;
  paginaActual: number = 1;
  searchText: string = '';
  loading: boolean = false;

  // Variables para los filtros
  selectedStatus: string = 'Status';
  selectedGender: string = 'Genre';

  constructor(
    private personajesServicio: DataPersonajesService,
    private router: Router,
    private seleccionarImagenServicio: SeleccionarImagenService
  ) { }

  ngOnInit(): void {
    this.loadPersonajes(this.paginaActual);
    this.personajesServicio.totalPaginas$.subscribe(pages => {
      this.totalPages = pages;
    });
    this.personajesServicio.totalPersonajes$.subscribe(personajes => {
      this.totalPersonajes = personajes;
    });
  }

  loadPersonajes(page: number): void {
    this.loading = true;
    this.personajesServicio.getInformacionPersonajes(page).subscribe((data: any) => {
      this.personajes = data.results;
      this.filterPersonajes();
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  filterPersonajes(): void {
    let filtered = this.personajes;

    // Filtrar por texto de búsqueda
    if (this.searchText.trim()) {
      filtered = filtered.filter(personaje =>
        personaje.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Filtrar por estado
    if (this.selectedStatus !== 'Status') {
      filtered = filtered.filter(personaje =>
        personaje.status === this.selectedStatus
      );
    }

    // Filtrar por género
    if (this.selectedGender !== 'Genre') {
      filtered = filtered.filter(personaje =>
        personaje.gender === this.selectedGender
      );
    }

    this.filteredPersonajes = filtered;
  }
 //cambiamos de pagina, debemos hacer la llamada al api para la siguiente pagina
  onPageChange(page: number): void {
    this.paginaActual = page;
    this.loadPersonajes(page);
  }

  //buscador
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.filterPersonajes();
  }

  // Métodos para manejar cambios en los selectores
  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedStatus = select.value;
    this.filterPersonajes();
  }
  //si cambia el select de genero
  onGenderChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedGender = select.value;
    this.filterPersonajes();
  }

  redireccionar_Detalles(id: number): void {
    this.router.navigate(['/informacionPersonaje', id]);
  }

  getImagenEspecie(species: string): string {
    return this.seleccionarImagenServicio.getImagenEspecie(species);
  }

  getImagenEstado(estado: string): string {
    return this.seleccionarImagenServicio.getImagenEstado(estado);
  }

  getImagenGenero(genero: string): string {
    return this.seleccionarImagenServicio.getImagenGenero(genero);
  }
}
