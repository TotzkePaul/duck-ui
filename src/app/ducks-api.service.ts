import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Duck } from './duck';

@Injectable()
export class DuckService {

  // Define API
  apiURL = 'https://duckapi.azurewebsites.net';
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch duck list
  getDucks(page:number, pageSize:number, sortBy:string): Observable<Duck[]> {
    let params = new HttpParams();
    params = params.set('Page', `${page}`);
    params = params.set('PageSize', `${pageSize}`);
    params = params.set('SortBy', `${sortBy}`);
    return this.http
      .get<Duck[]>(this.apiURL + '/ducks', {params})
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch duck
  getDuck(id: any): Observable<Duck> {
    return this.http
      .get<Duck>(this.apiURL + '/ducks/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create duck
  createDuck(duck: any): Observable<Duck> {
    return this.http
      .post<Duck>(
        this.apiURL + '/ducks',
        JSON.stringify(duck),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update duck
  updateDuck(id: any, duck: any): Observable<Duck> {
    return this.http
      .put<Duck>(
        this.apiURL + '/ducks/' + id,
        JSON.stringify(duck),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete duck
  deleteDuck(id: any) {
    return this.http
      .delete<Duck>(this.apiURL + '/ducks/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

