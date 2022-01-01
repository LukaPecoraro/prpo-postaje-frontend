import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Rezervacija } from '../models/rezervacija';


@Injectable()
export class RezervacijeService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/rezervacije';

    constructor(private http: HttpClient) {
    }

    getRezervacije(): Observable<Rezervacija[]> {
        return this.http.get<Rezervacija[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getRezervacija(id: number): Observable<Rezervacija> {
        const url = `${this.url}/${id}`;
        return this.http.get<Rezervacija>(url)
                        .pipe(catchError(this.handleError));
    }

    //vrne rezervacije za polnilno postajo
    getRezervacijePostaja(id: number): Observable<Rezervacija[]> {
        //http://localhost:8080/v1/rezervacije?filter=polnilnaPostaja.idPostaja:EQ:2
        const url = `${this.url}?filter=polnilnaPostaja.idPostaja:EQ:${id}`;
        return this.http.get<Rezervacija[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    //{\"datumRezervacije\":\"2022-02-01T08:00:00Z[UTC]\",\"idPostaja\":1,\"idUporabnik\":1,\"uraKonca\":\"1970-01-01T08:00:00Z[UTC]\",\"uraZacetka\":\"1970-01-01T20:03:00Z[UTC]\"}

    //TODO POST
    // create(seznamId: number, artikel: Artikel): Observable<Artikel> {
    //     return this.http.post<Rezervacija>(this.url + '/' + seznamId + '/artikli', JSON.stringify(artikel), {headers: this.headers})
    //                     .pipe(catchError(this.handleError));
    // }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

