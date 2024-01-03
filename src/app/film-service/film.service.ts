import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Results} from "../model/results";

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    private API_TOKEN: string = '56653a0e06c651a8097b7fc8226714ba';
    private baseUrl: string = 'https://api.themoviedb.org/3';
    private imageBaseUrl: string = 'https://image.tmdb.org/t/p/w300';

    constructor(private http: HttpClient) {
    }

    getCommentsForMovie(movieId: number): Observable<Comment[]> {
      return this.http.get<Comment[]>(`${this.baseUrl}/${movieId}/comments`);
    }

    getPopularMovies(): Observable<Results> {
        const url = `${this.baseUrl}/movie/popular?api_key=${this.API_TOKEN}`;
        return this.http.get<Results>(url);
    }

    searchMovies(text: string, page: number) {
        const url = `${this.baseUrl}/search/movie?api_key=${this.API_TOKEN}&language=fr&query=${text}&page=${page}`;
        return this.http.get(url);
    }

    getMoviePoster(poster_path: string) {
        return `${this.imageBaseUrl}${poster_path}`;
    }

    getMovieDetails(id: number) {
        const url = `${this.baseUrl}/movie/${id}?api_key=${this.API_TOKEN}&language=fr`;
        return this.http.get(url);
    }


}
