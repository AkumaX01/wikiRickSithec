import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionarImagenService {

  constructor() { }

  // Método para obtener la imagen correspondiente a la especie
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

  // Método para obtener la imagen correspondiente al estado
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

  // Método para obtener la imagen correspondiente al género
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
}
