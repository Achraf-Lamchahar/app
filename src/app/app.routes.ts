import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { ListFilmComponent } from './list-film/list-film.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: 'film', component: ListFilmComponent },
  { path: 'film/:id', component: FilmDetailsComponent },
  { path: '**', redirectTo: 'film' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignupComponent, title: 'Signup' },
  //{ path: 'favoris', component: FavoriComponent, title: 'Favoris', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
