import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {NakupovalniSeznam} from './models/seznam';
import {SeznamiService} from './services/seznami.service';

import { PostajeService } from './services/postaje.service';

import { Postaja } from './models/postaja';
import { Rezervacija } from './models/rezervacija';

import { RezervacijeService } from './services/rezervacije.service';


@Component({
    moduleId: module.id,
    selector: 'seznam-podrobnosti',
    templateUrl: 'postaje-podrobnosti.component.html'
})
export class PostajePodrobnostiComponent implements OnInit {
    postaja: Postaja;
    rezervacije: Rezervacija[]
    //idUporabnik: number
    //ezervacijeUporabnik: Rezervacija[]

    constructor(private postajeService: PostajeService,
                private rezervacijeService: RezervacijeService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.pipe(
            switchMap((params: Params) => this.postajeService.getPostaja(+params['id'])))
            .subscribe(postaja => this.postaja = postaja);

        // //rezervacije
        this.route.params.pipe(
            switchMap((params: Params) => this.rezervacijeService.getRezervacijePostaja(+params['id'])))
            .subscribe(rezervacije => this.rezervacije = this.popraviUreRez(rezervacije));
        
        //this.idUporabnik = 1 //hardcodamo za demo
        // this.route.params.pipe(
        //     switchMap((params: Params) => this.rezervacijeService.getRezervacijeUporabnik(1,+params['id'])))
        //     .subscribe(rezervacijeUporabnik => this.rezervacijeUporabnik = this.popraviUreRez(rezervacijeUporabnik));

    }

    //naredi lepe ure in datume
    popraviUreRez(rezervacije: Rezervacija[]){
        rezervacije.forEach(function(rez){
            //spuci un z[utc] zadi
            rez.datumRezervacije = rez.datumRezervacije.substring(0, rez.datumRezervacije.length - 6);
            rez.uraZacetka =  rez.uraZacetka.substring(0, rez.uraZacetka.length - 6);
            rez.uraKonca = rez.uraKonca.substring(0, rez.uraKonca.length - 6);
            
            //lep datum rezervacije
            let input=rez.datumRezervacije
            let dat = String(new Date(input))
            let arr = dat.split(" ");
            rez.datumRezervacije = arr.slice(0, 4).join(" ")

            //ura zacetka
            input=rez.uraZacetka
            dat = String(new Date(input))
            arr = dat.split(" ");
            rez.uraZacetka=arr[4].substring(0,5)

            input=rez.uraKonca
            dat = String(new Date(input))
            arr = dat.split(" ");
            rez.uraKonca=arr[4].substring(0,5)
        })
        return rezervacije
    }

    dodajRezervacijo(): void {
        this.router.navigate(['postaje/' + this.postaja.idPostaja + '/dodaj']);
    }

    nazaj(): void {
        this.router.navigate(['postaje']);
    }

    // delete(rez: Rezervacija): void {
    //     this.rezervacijeService
    //         .delete(rez.idRezervacija)
    //         .subscribe(rezId => this.rezervacijeUporabnik = this.rezervacijeUporabnik.filter(s => s.idRezervacija !== rezId));
    // }
}
