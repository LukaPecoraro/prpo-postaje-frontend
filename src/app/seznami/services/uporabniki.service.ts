import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Uporabnik } from '../models/uporabnik';


@Injectable()
export class UporabnikiService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/uporabniki';

    constructor(private http: HttpClient) {
    }

    getUporabniki(): Observable<Uporabnik[]> {
        return this.http.get<Uporabnik[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getUporabnik(id: number): Observable<Uporabnik> {
        const url = `${this.url}/${id}`;
        return this.http.get<Uporabnik>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    //TODO POST
    // create(seznamId: number, artikel: Artikel): Observable<Artikel> {
    //     return this.http.post<Artikel>(this.url + '/' + seznamId + '/artikli', JSON.stringify(artikel), {headers: this.headers})
    //                     .pipe(catchError(this.handleError));
    // }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

