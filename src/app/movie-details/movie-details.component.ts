import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-movie-details",
    standalone: false,

    templateUrl: "./movie-details.component.html",
    styleUrl: "./movie-details.component.scss",
})
export class MovieDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
