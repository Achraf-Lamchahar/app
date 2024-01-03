import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FilmService} from "../film-service/film.service";
import {UsersloginService} from "../users.login.service";
import {Router, RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
import {AuthResponseData} from "../users.login.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  imports: [
    FormsModule, CommonModule, RouterLink
  ],
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    private userSub: Subscription;

    ngOnInit() {
        this.userLoginService.autoLogin();
        this.userSub = this.userLoginService.userSubject.subscribe((user) => {
            console.log('user', user);
            this.isAuthenticated = !!user;
        });
    }


  constructor(private filmService: FilmService, private userLoginService: UsersloginService, private router: Router) {


  }
  searchTerm: string = '';
  isAuthenticated: boolean = false;

    @Output() searchChanged = new EventEmitter<string>();

  onSearchChange() {
    this.searchChanged.emit(this.searchTerm);
  }

  onLogout() {
    this.userLoginService.logout();
    this.isAuthenticated = false;
  }
  onLogin() {
    this.router.navigate(['/login']);
    this.isAuthenticated = true;
  }
}
