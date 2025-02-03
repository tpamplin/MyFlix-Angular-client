import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { GenreDetailsComponent } from "../genre-details/genre-details.component";
import { DirectorDetailsComponent } from "../director-details/director-details.component";
import { MovieDetailsComponent } from "../movie-details/movie-details.component";

@Component({
    selector: "app-movie-card",
    standalone: false,

    templateUrl: "./movie-card.component.html",
    styleUrl: "./movie-card.component.scss",
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            console.log("fetching movies");
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    showGenreDetails(genre: any): void {
        this.dialog.open(GenreDetailsComponent, {
            data: genre,
            width: "500px",
        });
    }

    showDirectorDetails(director: any): void {
        this.dialog.open(DirectorDetailsComponent, {
            data: director,
            width: "500px",
        });
    }

    showMovieDetails(movie: any): void {
        this.dialog.open(MovieDetailsComponent, {
            data: movie,
            width: "500px",
        });
    }

    // toggleFavorite(movie: any): void {
    //     if (this.favoriteMovies.includes(movie)) {
    //         this.removeMovieFromFavorites(movie);
    //     } else {
    //         this.addMovieToFavorites(movie);
    //     }
    // }

    // removeMovieFromFavorites(movieID: any): void {
    //     console.log("removing " + movieID + " from favorites");
    //     this.fetchApiData.deleteFavorite(movieID).subscribe((resp: any) => {
    //         console.log(resp);
    //         this.snackBar.open("Movie removed from favorites.", "OK", {
    //             duration: 1000,
    //         });
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 1000);
    //     });
    // }

    addMovieToFavorites(movieID: any): void {
        console.log("adding " + movieID + " to favorites");
        this.fetchApiData.addFavorite(movieID).subscribe((resp: any) => {
            console.log(resp);
            this.snackBar.open("Movie added to favorites.", "OK", {
                duration: 2000,
            });
        });
    }
}
