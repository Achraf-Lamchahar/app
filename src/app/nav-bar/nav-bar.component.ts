import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FilmService} from "../film-service/film.service";
import {UsersloginService} from "../users.login.service";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  imports: [
    FormsModule, CommonModule
  ],
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private filmService: FilmService, private userLoginService: UsersloginService, private router: Router) { }
  searchTerm: string = '';
  isAuthenticated: boolean = false;

    @Output() searchChanged = new EventEmitter<string>();

  onSearchChange() {
    this.searchChanged.emit(this.searchTerm);
  }

  onLogout() {
    this.userLoginService.logout();
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
