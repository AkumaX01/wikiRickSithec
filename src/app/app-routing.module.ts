import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InformacionPersonajeComponent } from './informacion-personaje/informacion-personaje.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { EpisodioComponent } from './episodio/episodio.component';
const routes: Routes = [
  { path: 'personajes', component: PersonajesComponent },
  { path: 'informacionPersonaje/:id', component: InformacionPersonajeComponent },
  { path: 'localizacion/:url', component: LocalizacionComponent },
  { path: 'episodio/:url', component: EpisodioComponent },
  { path: '', redirectTo: '/personajes', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 