// Import Angular Components
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

// Import custom components
import { FetchApiDataService } from "../fetch-api-data.service";
import { GenreDetailsComponent } from "../genre-details/genre-details.component";
import { DirectorDetailsComponent } from "../director-details/director-details.component";
import { MovieDetailsComponent } from "../movie-details/movie-details.component";

// Component Definitions
@Component({
    selector: "app-movie-card",
    standalone: false,

    templateUrl: "./movie-card.component.html",
    styleUrl: "./movie-card.component.scss",
})

/**
 * Movie card component -- Handles each movie card on the main movie screen
 */
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    favorites: any[] = [];
    user: any = {};

    //Building default ui components
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {}

    /**
     * When the component is loaded, it will first load movies, then get an array containing the _ids of the user's favorite movies.
     */
    ngOnInit(): void {
        this.getMovies();
        this.getUserFavorites();
    }

    /**
     * Calls fetchApiData to get all movies from the database and then saves them to the local variable this.movies.
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            console.log("fetching movies");
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    /**
     * Calls fetchApiData to get the user and then extracts the list of favorites from the user data.
     */
    getUserFavorites(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            this.favorites = this.user.Favorites;
            console.log("favorites: " + this.favorites);
            // Set favorite/unfavorite icons.
            this.setFavoritesIcon();
        });
    }

    /**
     * Check if eacm movie is on the favorites list and set favorite/unfavorite icons
     */
    setFavoritesIcon(): void {
        //wait 1 second after loading to ensure that user.favorites has been populated.
        setTimeout(() => {
            console.log("Checking " + this.movies + " for favorites");
            //cycle through each movie in this.movies, and if it's _id is included in the users list of favorites, change the favorite icon to a delete icon
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
        }, 1000); // Change this number to change how long the page will wait before trying to compare favorites.
    }
    /**
     * When a user clicks favorite/unfavorite on a movie, change the icon to the opposite of what it was.
     * @param {string} movieID
     */

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
                }
                if (movie.icon === "favorite") {
                    movie.icon = "delete";
                    console.log(movie.icon);
                }
            }
        });
        //in case the Icon does not update, wait 3 seconds and then update favorites and all icons to ensure they are correct.
        setTimeout(() => {
            this.getUserFavorites();
            this.setFavoritesIcon();
        }, 3000);
    }

    /**
     * Sends a movie's genre details to the genre details dialog
     * @param {object} genre
     */
    //
    showGenreDetails(genre: any): void {
        this.dialog.open(GenreDetailsComponent, {
            data: genre,
            width: "500px", // defines the width of the dialog
        });
    }

    /**
     * Sends a movie's director details to the director details dialog.
     * @param {object} director
     */

    showDirectorDetails(director: any): void {
        this.dialog.open(DirectorDetailsComponent, {
            data: director,
            width: "500px", // defines the width of the dialog
        });
    }

    /**
     * Sends all of a movie's details to the movie details dialog.
     * @param {object} movie
     */
    showMovieDetails(movie: any): void {
        this.dialog.open(MovieDetailsComponent, {
            data: movie,
            width: "500px", // defines the width of the dialog
        });
    }

    /**
     *  checks to see if a movie is on the favorites list and then removes it if it is, adds it if it isnt.
     *  @param {string} movieID
     */
    toggleFavorite(movieID: any): void {
        console.log(movieID);
        if (this.favorites.includes(movieID)) {
            console.log("removing movie");
            this.removeMovieFromFavorites(movieID);
        } else {
            console.log("adding movie");
            this.addMovieToFavorites(movieID);
        }
        // Get updated Favorites list, and toggles the favorite icon for the movie.
        this.getUserFavorites();
        this.toggleFavoritesIcon(movieID);
    }

    /**
     * Calls fetchApiData and sends a DELETE request to the server to remove a movie from a user's favorites list.
     * @param {string} movieID
     */
    removeMovieFromFavorites(movieID: any): void {
        console.log("removing " + movieID + " from favorites");
        this.fetchApiData.deleteFavorite(movieID).subscribe((resp: any) => {
            console.log(resp);
            this.snackBar.open("Movie removed from favorites.", "OK", {
                duration: 1000,
            });
        });
    }

    /**
     * Calls fetchApiData and sends a PUT request to add a movie to the user's favorites list.
     * @param {string} movieID
     */

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
