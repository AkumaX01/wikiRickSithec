import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de tener esta línea

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { InformacionPersonajeComponent } from './informacion-personaje/informacion-personaje.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonajesComponent,
    PaginacionComponent,
    InformacionPersonajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
