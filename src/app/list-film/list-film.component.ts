import { Component, OnInit } from '@angular/core';
import { FilmCardComponent } from '../film-card/film-card.component';
import { FilmService} from '../film-service/film.service';
import {NgFor} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Results} from "../model/results";
import {Film} from "../model/film";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {Subscription} from "rxjs";
import {UsersloginService} from "../users.login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-list-film',
    standalone: true,
  imports: [FilmCardComponent, NgFor, HttpClientModule, NavBarComponent], // Remove CommonModule if not needed
    templateUrl: './list-film.component.html',
    styleUrls: ['./list-film.component.css'],
    providers:[FilmService]
})
export class ListFilmComponent implements OnInit {
    results !: Results;
    filteredResults !: Film[];
    isAuthenticated = false;
    userSub: Subscription;

    constructor(private filmService: FilmService, private userLoginService: UsersloginService, private router: Router) {}

    ngOnInit() {
        this.filmService.getPopularMovies().subscribe((data) => {
          this.results = data;
          this.filteredResults = this.results.results;
          this.userSub = this.userLoginService.userSubject.subscribe((user) => {
            console.log('user', user);
            this.isAuthenticated = !!user;
          });
        });
    }

  onSearchChanged(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.filteredResults = this.results.results; // Show all movies if search term is empty
    } else {
      // Filter movies based on the search term
      this.filteredResults = this.results.results.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

}
