// Import angular components
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

//Import angular UI components
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

//Import fetchApiDataService in order to make calls to the backend.
import { FetchApiDataService } from "../fetch-api-data.service";

// Component definitions
@Component({
    selector: "app-user-login-form",
    standalone: false,

    templateUrl: "./user-login-form.component.html",
    styleUrl: "./user-login-form.component.scss",
})

/**
 * This component is a form dialog that allows the user to enter their username and password and gain access to the rest of the site.
 */
export class UserLoginFormComponent implements OnInit {
    // Define the userData object that will be sent to the server.
    @Input() userData = { Username: "", Password: "" };

    // declare local components.
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>, // Tells other components where to find this dialog.
        public snackBar: MatSnackBar,
        public router: Router
    ) {}

    ngOnInit(): void {}

    /**
     * Calls fetchApiData to send the login request.
     */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe(
            (result) => {
                const user = result;
                // Store the user locally for easy access to their data.
                localStorage.setItem("user", JSON.stringify(user.user));
                console.log("set user to: " + localStorage.getItem("user"));
                // Store the user's token locally to send back with any requests for further information.
                localStorage.setItem("token", user.token);
                console.log("set token to: " + localStorage.getItem("token"));

                //close dialog after all data has been retrieved.
                this.dialogRef.close();
                // Route the user to the all movies view.
                this.router.navigate(["movies"]);
                this.snackBar.open(result, "OK", {
                    duration: 2000,
                });
            },
            (result) => {
                this.snackBar.open(result, "OK", {
                    duration: 2000,
                });
            }
        );
    }
}
