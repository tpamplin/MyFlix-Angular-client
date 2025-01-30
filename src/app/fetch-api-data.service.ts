import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";

const apiUrl = "https://myflix-timpamplin-021f285e4632.herokuapp.com/"

@Injectable({
    providedIn: 'root'
})

export class UserRegistrationService {
    constructor(private http: HttpClient){}
    public userRegistration(userDetails:any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + "users", userDetails).pipe(
            catchError(this.handleError)
        );
    }
    
    private handleError(error:HttpErrorResponse): any{
        if (error.error instanceof ErrorEvent) {
            console.error("some error occured: ", error.error.message);
        } else {
            console.error(`Error Status code ${error.status}, error body is: ${error.error}` );
            return throwError("Something bad happened; Please try again later.")
        }
    }
}
export class FetchApiDataService {
    constructor() { }
}
