import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 42; // Número total de páginas
  @Output() pageChange = new EventEmitter<number>();

  // Crear una lista de páginas visibles según la página actual
  get pages(): number[] {
    const visiblePages = 5; // Número de páginas visibles (incluyendo la página actual)
    const pages: number[] = [];

    const startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
