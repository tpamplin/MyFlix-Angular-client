import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map,  } from "rxjs/operators";

const apiUrl = "https://myflix-timpamplin-021f285e4632.herokuapp.com/"

@Injectable({
    providedIn: 'root'
})

export class UserRegistrationService {
    constructor(private http: HttpClient){}

    private getStoredToken(): any {
        return localStorage.getItem('token');
    }

    private getStoredUser(): any {
        return localStorage.getItem('user')
    }

    public getAllMovies(): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.get(
            apiUrl + 'movies', 
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )

    }

    public getMovie(Title: string): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.get(
            apiUrl + 'movies/' + Title, 
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getDirector(name: string): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.get(
            apiUrl + "directors/" + name, 
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getGenre(name: string): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.get(
            apiUrl + "genres/" + name,
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getUser(): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.get(
            apiUrl + "users/" + user.Username,
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public getUserFavorites(): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.get(
            apiUrl + "users/" + user.Username + "/favorites",
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public addFavorite(movieID: string): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.post(
            apiUrl + "users/" + user.Username + "/favorites",
            {"MovieID": movieID},
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )

    }

    public updateUser(userDetails:any): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token,
            }
            )
        }
        return this.http.post(
            apiUrl + "users/" + user.Username,
            userDetails,
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )

    }

    public deleteUser(): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }
        return this.http.delete(
            apiUrl + "users/" + user.Username, 
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public deleteFavorite(movieID: string): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
            body: {"MovieID": movieID}
        }
        return this.http.delete(
            apiUrl + "users/" + user.Username + "/favorites", 
            options
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public userLogin(userDetails:any): Observable<any> {
        console.log(userDetails);
        return this.http.post(
            apiUrl + "login", 
            userDetails
        ).pipe(
            catchError(this.handleError)
        );
    }

    public userRegistration(userDetails:any): Observable<any> {
        console.log(userDetails);
        return this.http.post(
            apiUrl + "users", 
            userDetails
        ).pipe(
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
