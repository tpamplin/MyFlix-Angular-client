// Import angular components.
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

// Component Definitions
@Component({
    selector: "app-director-details",
    standalone: false,

    templateUrl: "./director-details.component.html",
    styleUrl: "./director-details.component.scss",
})

/**
 * Takes director data from the movie card and sends it to the director details dialog to be rendered.
 */
export class DirectorDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
