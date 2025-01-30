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

    private getStoredToken(): any {
        return localStorage.getItem('token');
    }

    private getUserData(): any {
        return localStorage.getItem('user')
    }

    public getAllMovies(): Observable<any> {
        const token = this.getStoredToken();
        return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            }
        )}).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )

    }

    public getMovie(title: string): Observable<any> {
        const token = this.getStoredToken();
        return this.http.get(apiUrl + 'movies/' + title, {
            headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getDirector(name: string): Observable<any> {
        const token = this.getStoredToken();
        return this.http.get(apiUrl + "directors/" + name, {
            headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getGenre(name: string): Observable<any> {
        const token = this.getStoredToken();
        return this.http.get(apiUrl + "genres/" + name, {
            headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getUser(): Observable<any> {

    }

    public getUserFavorites(): Observable<any> {

    }

    public addFavorite(): Observable<any> {

    }

    public updateUser(): Observable<any> {

    }

    public deleteUser(): Observable<any> {

    }

    public deleteFavorite(): Observable<any> {

    }



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

    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }
}
export class FetchApiDataService {
    constructor() { }
}
