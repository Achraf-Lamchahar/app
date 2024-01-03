import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../film-service/film.service";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {AngularEditorConfig, AngularEditorModule} from '@kolkov/angular-editor';
import {FormsModule} from "@angular/forms";
import {CommentService} from "../comments-service/comments.service";

@Component({
  selector: 'app-film-details',
  standalone: true,
  templateUrl: './film-details.component.html',
  imports: [
    NgIf, HttpClientModule, AngularEditorModule, FormsModule, NgForOf
  ],
  styleUrl: './film-details.component.css',
  providers:[FilmService, CommentService]
})
export class FilmDetailsComponent implements OnInit{
  filmId !: number;
  filmDetails: any = {};
  comments : any[] = [];
  currentPage = 1;
  commentsPerPage = 5;
  newComment: string = '';
  isCommentEmpty: boolean = false;
  constructor(private route: ActivatedRoute, private filmService: FilmService, private commentService: CommentService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.filmId = +params['id'];
            this.filmService.getMovieDetails(this.filmId).subscribe(
                (filmDetails) => {
                    // Process and display the detailed information about the selected movie
                    this.filmDetails = filmDetails;
                    // Fetch comments when the component initializes and after loading movie details
                    this.loadComments();
                },
                (error: HttpErrorResponse) => {
                    console.error('Error fetching movie details:', error);
                    // Display an error message to the user
                }
            );

            // Fetch comments when the component initializes
            this.commentService.getComments().subscribe(
                (data) => {
                    this.comments = data;
                },
                (error: HttpErrorResponse) => {
                    console.error('Error fetching comments:', error);
                    // Display an error message to the user
                }
            );
        });
    }

  loadComments() {
    this.filmService.getCommentsForMovie(this.filmId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      },
      error => {
        console.error('Error loading comments', error);
      }
    );
  }

  get paginatedComments(): any[] {
    const startIndex = (this.currentPage - 1) * this.commentsPerPage;
    const endIndex = startIndex + this.commentsPerPage;
    return this.comments.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.comments.length / this.commentsPerPage);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(page: number) {
    if (page === -1 && this.currentPage > 1) {
      this.currentPage--;
    } else if (page === 1 && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (page > 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addComment() {
      // Check if the comment is empty before submitting
      if (this.newComment.trim() === '') {
          this.isCommentEmpty = true;
          return;
      }
      // Reset the error flag
      this.isCommentEmpty = false;
    console.log('New comment:', this.newComment);
    const commentData = {
      text: this.newComment,
      movie_id: this.filmId,
      // You may need to include additional data such as the film ID or user ID
    };

    this.commentService.addComment(commentData).subscribe(
      (response) => {
        // Assuming your backend returns the added comment
        this.comments.push(response);
        this.newComment = ''; // Clear the input after adding the comment
      },
      (error) => {
        console.error('Error adding comment:', error);
        // Handle the error as needed (e.g., show an error message to the user)
      }
    );
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

}
