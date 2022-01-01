import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { NakupovalniSeznam } from './models/seznam';
import { PostajeService } from './services/postaje.service';

import { Postaja } from './models/postaja';

@Component({
    moduleId: module.id,
    selector: 'vsi-seznami',
    templateUrl: 'postaje.component.html'
})
export class PostajeComponents implements OnInit {
    postaje: Postaja[];
    postaja: Postaja;

    constructor(private postajeService: PostajeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getSeznami();
    }

    getSeznami(): void {
        this.postajeService
            .getPostaje()
            .subscribe(seznami => this.postaje = seznami);
    }

    naPodrobnosti(seznam: Postaja): void {
        this.postaja = seznam;
        this.router.navigate(['/postaje', this.postaja.idPostaja]);
    }

    delete(seznam: NakupovalniSeznam): void {
        this.postajeService
            .delete(seznam.id)
            .subscribe(seznamId => this.postaje = this.postaje.filter(s => s.idPostaja !== seznamId));
    }

}
