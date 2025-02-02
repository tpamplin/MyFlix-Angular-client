import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
    selector: "app-user-profile-view",
    standalone: false,

    templateUrl: "./user-profile-view.component.html",
    styleUrl: "./user-profile-view.component.scss",
})
export class UserProfileViewComponent implements OnInit {
    user: any = {};
    favorites: any[] = [];

    constructor(public fetchApiData: FetchApiDataService) {}

    ngOnInit(): void {
        this.getUser();
        this.getFavorites();
    }

    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            console.log("response: " + resp);
            console.log("getting user data");
            this.user = resp;
            console.log(this.user);
            console.log(this.user.Favorites);
        });
    }

    getFavorites(): void {
        this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
            console.log("fetching movies");
            console.log(
                "this user has " +
                    this.user.Favorites.length +
                    " favorite movies"
            );
            for (let i = 0; i < this.user.Favorites.length; i++) {
                console.log("finding movie with id: " + this.user.Favorites[i]);
                for (let j = 0; j < movies.length; j++) {
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
}
