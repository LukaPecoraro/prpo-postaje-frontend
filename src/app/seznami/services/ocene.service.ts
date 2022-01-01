import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Ocena } from '../models/ocena';

@Injectable()
export class OceneService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/ocene';

    constructor(private http: HttpClient) {
    }

    getOcene(): Observable<Ocena[]> {
        return this.http.get<Ocena[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getOcena(id: number): Observable<Ocena> {
        const url = `${this.url}/${id}`;
        return this.http.get<Ocena>(url)
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

