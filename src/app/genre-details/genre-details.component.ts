// Imports
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

// Component definitions
@Component({
    selector: "app-genre-details",
    standalone: false,

    templateUrl: "./genre-details.component.html",
    styleUrl: "./genre-details.component.scss",
})
/**
 * Takes genre data from the movie card and sends it to the genre details dialog to be rendered.
 */
export class GenreDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
