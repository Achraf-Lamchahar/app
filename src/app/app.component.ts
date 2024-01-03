import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFilmComponent } from './list-film/list-film.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {Router, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {UsersloginService} from "./users.login.service";
import {FilmService} from "./film-service/film.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListFilmComponent, NavBarComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'film-app';
  isAuthenticated = false;
  userSub: Subscription;

  constructor(
      private router: Router,
      private userLoginService: UsersloginService,
      public dialog: MatDialog,
      private filmService: FilmService
  ) {}

  ngOnInit() {
      this.userLoginService.autoLogin();
      this.userSub = this.userLoginService.userSubject.subscribe((user) => {
          console.log('user', user);
          this.isAuthenticated = !!user;
      });
  }

}
