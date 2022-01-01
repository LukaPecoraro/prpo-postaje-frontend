import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {NakupovalniSeznam} from './models/seznam';
import {SeznamiService} from './services/seznami.service';

import { PostajeService } from './services/postaje.service';
import { RezervacijeService } from './services/rezervacije.service';
import { Postaja } from './models/postaja';
import { Rezervacija } from './models/rezervacija';

@Component({
    moduleId: module.id,
    selector: 'seznam-podrobnosti',
    templateUrl: 'postaje-podrobnosti.component.html'
})
export class PostajePodrobnostiComponent implements OnInit {
    postaja: Postaja;
    rezervacije: Rezervacija[]

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
        // this.route.params.pipe(
        //     switchMap((params: Params) => this.rezervacijeService.getRezervacijePostaja(+params['id'])))
        //     .subscribe(rezervacije => this.rezervacije = rezervacije);
    }

    dodajRezervacijo(): void {
        this.router.navigate(['postaje/' + this.postaja.idPostaja + '/dodaj']);
    }

    nazaj(): void {
        this.router.navigate(['postaje']);
    }
}
