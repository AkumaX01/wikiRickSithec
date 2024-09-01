import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent implements OnInit {
  @Input() totalPages: number = 42; // Total de páginas, puedes ajustarlo
  @Input() currentPage: number = 1; // Página actual
  @Output() pageChange = new EventEmitter<number>(); // Emisor de eventos para notificar el cambio de página

  pages: number[] = [];

  ngOnInit(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Cambia a la página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  // Cambia a la siguiente página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  // Ir a una página específica
  goToPage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}