import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { MiPerfilComponent } from './perfil/mi-perfil.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'perfil', component: MiPerfilComponent },
  { path: '', redirectTo: '/publicaciones', pathMatch: 'full' }
];