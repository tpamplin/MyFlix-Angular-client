//import Angular components
import { Component, OnInit } from "@angular/core";

//Import Angular UI components
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

//Import Custom components.
import { FetchApiDataService } from "../fetch-api-data.service";
import { UpdateProfileFormComponent } from "../update-profile-form/update-profile-form.component";
import { DirectorDetailsComponent } from "../director-details/director-details.component";
import { GenreDetailsComponent } from "../genre-details/genre-details.component";
import { MovieDetailsComponent } from "../movie-details/movie-details.component";

// Component Definitions.
@Component({
    selector: "app-user-profile-view",
    standalone: false,

    templateUrl: "./user-profile-view.component.html",
    styleUrl: "./user-profile-view.component.scss",
})

// This component will show the user their email, birthday and username as well as a list of favorites.
export class UserProfileViewComponent implements OnInit {
    user: any = {};
    favorites: any[] = [];

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {}

    // when this component is initialized, it will call get user to get all user data, including a list of favorites.
    ngOnInit(): void {
        this.getUser();
    }

    // This function calls fetchApiData to get all of the user's data.
    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            console.log("response: " + resp);
            console.log("getting user data");
            this.user = resp;
            console.log(this.user);
            console.log(this.user.Favorites);
            //when the user data has been retrieved, call getFavorites to extract the list of favorites.
            this.getFavorites();
        });
    }

    // Calls fetchApiData  to get a list of all movies, it then builds a list of complete movie objects by comparing it to the movie _ids in the user's favorites list.
    getFavorites(): void {
        this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
            console.log("fetching movies");
            console.log(
                "this user has " +
                    this.user.Favorites.length +
                    " favorite movies"
            );
            // For every id in the user's favorites list.
            for (let i = 0; i < this.user.Favorites.length; i++) {
                console.log("finding movie with id: " + this.user.Favorites[i]);
                //check all movies and find the one with the _id that matches the entry in the user's favorites.
                for (let j = 0; j < movies.length; j++) {
                    // if the ids match, add the movie to this.favorites array.
                    if (this.user.Favorites[i] === movies[j]._id) {
                        console.log(
                            "adding " + movies[j].Title + " to favorites list"
                        );
                        this.favorites = [...this.favorites, movies[j]];
                    }
                }
            }
            console.log(this.favorites);
        });
    }

    //Calls fetchApiData to remove a movie from the user's list of favorites.
    removeMovieFromFavorites(movieID: any): void {
        console.log("removing " + movieID + " from favorites");
        this.fetchApiData.deleteFavorite(movieID).subscribe((resp: any) => {
            console.log(resp);
            this.snackBar.open("Movie removed from favorites.", "OK", {
                duration: 1000,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }

    // Sends data and opens dialog for the genre of a specific movie.
    showGenreDetails(genre: any): void {
        this.dialog.open(GenreDetailsComponent, {
            data: genre,
            width: "500px",
        });
    }

    // Sends data and opens dialog for the director of a specific movie.
    showDirectorDetails(director: any): void {
        this.dialog.open(DirectorDetailsComponent, {
            data: director,
            width: "500px",
        });
    }

    // Sends data and opens dialog to get more information about a movie.
    showMovieDetails(movie: any): void {
        this.dialog.open(MovieDetailsComponent, {
            data: movie,
            width: "500px",
        });
    }

    // Opens a form dialog to allow the user to update their profile with a new username, password, email, and birthday.
    openUpdateProfileDialog(): void {
        this.dialog.open(UpdateProfileFormComponent, {
            width: "500px",
        });
    }
}
