import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FilmService} from "../film-service/film.service";

@Component({
    selector: 'app-film-card',
    standalone: true,
    imports: [HttpClientModule],
    templateUrl: './film-card.component.html',
    styleUrl: './film-card.component.css',
    providers:[FilmService]
})
export class FilmCardComponent {

    @Input() filmId !: number;
    @Input() poster_path !: string;
    @Input() title !: string;
    @Input() releaseDate !: string;
    @Input() rating !: number;

    constructor(private router: Router) {
    }

    navigateToFilmDetails() {
        // Navigate to the film details page when the card is clicked
        this.router.navigate(['/film', this.filmId]);
    }

}
