import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0; // Usar el total de páginas recibido como entrada
  @Output() pageChange = new EventEmitter<number>();

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

  cambiarPagina(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
