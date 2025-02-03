import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-genre-details",
    standalone: false,

    templateUrl: "./genre-details.component.html",
    styleUrl: "./genre-details.component.scss",
})
export class GenreDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
