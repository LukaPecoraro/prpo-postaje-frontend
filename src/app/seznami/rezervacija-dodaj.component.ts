import {Component} from '@angular/core';
import {Router, Params, ActivatedRoute} from '@angular/router';

import {SeznamiService} from './services/seznami.service';
import { Artikel } from './models/artikel';
import { switchMap } from 'rxjs/operators';

import { Rezervacija } from './models/rezervacija';
import { RezervacijeService } from './services/rezervacije.service';

import { Postaja } from './models/postaja';

@Component({
    moduleId: module.id,
    selector: 'dodaj-artikel',
    templateUrl: 'rezervacija-dodaj.component.html'
})
export class ArtikelDodajComponent {

    rezervacija: Rezervacija = new Rezervacija;
    postajaId: number;

    



    private sub: any;

    constructor(private rezervacijeService: RezervacijeService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.postajaId = +params['id'];
        });
      }

      ngOnDestroy() {
        this.sub.unsubscribe();
      }

    // submitForm(): void {
    //     this.rezervacijeService.create(this.seznamId, this.artikel)
    //         .subscribe(() => this.router.navigate(['/seznami/' + this.seznamId]));
    // }

    nazaj(): void {
        this.router.navigate(['/seznami']);
    }

}
