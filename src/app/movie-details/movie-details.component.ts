// Import angular components
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

// Component Definitions
@Component({
    selector: "app-movie-details",
    standalone: false,

    templateUrl: "./movie-details.component.html",
    styleUrl: "./movie-details.component.scss",
})
/**
 * Send movie data from the movie card to the movie details dialog
 */
export class MovieDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
