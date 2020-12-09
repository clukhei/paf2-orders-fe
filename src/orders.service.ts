import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError,  } from 'rxjs';
import { environment } from './environments/environment';
import {Orders} from './order'
import { catchError, map, tap } from 'rxjs/operators';


const SERVER = environment.apiURL

const httpOptions ={
    headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
    })
}
@Injectable()
export class OrderService{

    constructor(private http: HttpClient){}

    
    getAnOrder(id:number): Observable<Orders[]> {
        return this.http.get<Orders[]>(`${SERVER}/${id}`, httpOptions)
            .pipe(
                tap((_)=> console.log(_,'fetched getOrderCountDetails')),
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.error('An error occurred:', error.error.message)
        } else {
            console.error(
                `Backend returned code ${error.status}` + 
                ` body was ${error.error}`
            )
        }
        return throwError(
            `Error status ${error.status}. Something bad happened; Please try again later`
        )
    }
}

