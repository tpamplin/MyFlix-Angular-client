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
    favorites: any[] = [];
    user: any = {};

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getMovies();
        this.getUserFavorites();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            console.log("fetching movies");
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    getUserFavorites(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            this.favorites = this.user.Favorites;
            console.log("favorites: " + this.favorites);
            this.setFavoritesIcon();
        });
    }

    setFavoritesIcon(): void {
        //wait 1 second after loading to ensure that user.favorites has been populated.
        setTimeout(() => {
            console.log("Checking " + this.movies + " for favorites");
            this.movies.forEach((movie: any) => {
                movie.icon = "favorite";
                if (this.favorites.includes(movie._id)) {
                    console.log(
                        movie.Title +
                            " is in the user's favorites list, checking icon."
                    );
                    movie.icon = "delete";
                } else if (!this.favorites.includes(movie._id)) {
                    movie.icon = "favorite";
                }
            });
        }, 1000);
    }

    toggleFavoritesIcon(movieID: any): void {
        this.movies.forEach((movie: any) => {
            console.log(
                "Checking " + movie._id + " to see if it matches " + movieID
            );
            if (movie._id === movieID) {
                console.log("toggling the icon for " + movie.Title);
                console.log(movie.icon);
                if (movie.icon === "delete") {
                    movie.icon = "favorite";
                    console.log(movie.icon);
                    return;
                }
                if (movie.icon === "favorite") {
                    movie.icon = "delete";
                    console.log(movie.icon);
                    return;
                }
            }
        });
        //in case the Icon does not update, wait 3 seconds and then update all icons to ensure they are correct.
        setTimeout(() => {
            this.getUserFavorites();
            this.setFavoritesIcon();
        }, 3000);
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

    toggleFavorite(movieID: any): void {
        console.log(movieID);
        if (this.favorites.includes(movieID)) {
            console.log("removing movie");
            this.removeMovieFromFavorites(movieID);
        } else {
            console.log("adding movie");
            this.addMovieToFavorites(movieID);
        }
        this.getUserFavorites();
        this.toggleFavoritesIcon(movieID);
    }

    removeMovieFromFavorites(movieID: any): void {
        console.log("removing " + movieID + " from favorites");
        this.fetchApiData.deleteFavorite(movieID).subscribe((resp: any) => {
            console.log(resp);
            this.snackBar.open("Movie removed from favorites.", "OK", {
                duration: 1000,
            });
        });
    }

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
