//import Angular components.
import { Component, OnInit } from "@angular/core";

//Import Angular UI components.
import { MatDialog } from "@angular/material/dialog";

//import custom components.
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";

//Component definitions.
@Component({
    selector: "app-welcome-page",
    standalone: false,

    templateUrl: "./welcome-page.component.html",
    styleUrl: "./welcome-page.component.scss",
})

/**
 * This is the component which the user will be presented with when they first land on the site with the option to open two dialogs, one to log in and one to sign up with a new account.
 */
export class WelcomePageComponent {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    /**
     * this will open the user registration dialog
     */
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: "280px",
        });
    }

    /**
     * this will open the user login dialog.
     */
    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent, {
            width: "280px",
        });
    }
}
