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
    templateUrl: 'rezervacije-pregled-component.html'
})
export class RezervacijePregledComponent implements OnInit {
    rezervacije: Rezervacija[]

    constructor(private postajeService: PostajeService,
                private rezervacijeService: RezervacijeService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {

        // //rezervacije
        this.route.params.pipe(
            switchMap((params: Params) => this.rezervacijeService.getRezervacijeUporabnik(+params['id']))) //naceloma kle params
            .subscribe(rezervacije => this.rezervacije = this.popraviUreRez(rezervacije));
        
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

    nazaj(): void {
        this.router.navigate(['postaje']);
    }

    // delete(rez: Rezervacija): void {
    //     this.rezervacijeService
    //         .delete(rez.idRezervacija)
    //         .subscribe(rezId => this.rezervacijeUporabnik = this.rezervacijeUporabnik.filter(s => s.idRezervacija !== rezId));
    // }

    delete(rez: Rezervacija): void {

        console.log(rez.idRezervacija)

        this.rezervacijeService
            .delete(rez.idRezervacija)
            .subscribe(rezid => this.rezervacije = this.rezervacije.filter(s => s.idRezervacija !== rezid));
    }


}
