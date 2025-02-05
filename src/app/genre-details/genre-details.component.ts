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
export class GenreDetailsComponent {
    // Loads genre details from movie.
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
