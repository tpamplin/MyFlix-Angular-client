import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
    selector: "app-user-login-form",
    standalone: false,

    templateUrl: "./user-login-form.component.html",
    styleUrl: "./user-login-form.component.scss",
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) {}

    ngOnInit(): void {}

    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe(
            (result) => {
                const user = result;
                localStorage.setItem("user", JSON.stringify(user.user));
                console.log("set user to: " + localStorage.getItem("user"));
                localStorage.setItem("token", user.token);
                console.log("set token to: " + localStorage.getItem("token"));

                this.dialogRef.close();
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
