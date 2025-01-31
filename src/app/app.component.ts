import { Component } from "@angular/core";
import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    standalone: false,
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    title = "MyFlix-Angular-client";

    constructor(public dialog: MatDialog) {}

    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: "280px",
        });
    }
}
