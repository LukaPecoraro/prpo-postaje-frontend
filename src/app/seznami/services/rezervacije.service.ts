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
        return this.http.get<Rezervacija[]>(url)
                        .pipe(catchError(this.handleError));
    }

    getRezervacijeUporabnik(idU: number): Observable<Rezervacija[]> {
        //http://localhost:8080/v1/rezervacije?filter=uporabnik.idUporabnik:EQ:1
        const url = `${this.url}?filter=uporabnik.idUporabnik:EQ:${idU}`;
        return this.http.get<Rezervacija[]>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }



    create(rezervacija: Rezervacija): Observable<Rezervacija> {
        let novaRez = this.http.post<Rezervacija>(this.url, JSON.stringify(rezervacija), {headers: this.headers}).pipe(catchError(this.handleError));
        return novaRez
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

