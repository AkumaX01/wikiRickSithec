import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InformacionPersonajeComponent } from './informacion-personaje/informacion-personaje.component';
import { PersonajesComponent } from './personajes/personajes.component';
const routes: Routes = [
  { path: 'personajes', component: PersonajesComponent },
  { path: 'informacionPersonaje/:id', component: InformacionPersonajeComponent },
  { path: '', redirectTo: '/personajes', pathMatch: 'full' }  // Redirige a /personajes por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 