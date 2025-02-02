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
    }

    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            console.log("getting user data");
            this.user = resp;
            this.favorites = this.user.Favorites;
        });
    }
}
