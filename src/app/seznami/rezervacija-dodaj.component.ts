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
export class RezervacijeDodajComponent {

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

    submitForm(): void {
        //popravi format da bo za backend uredi
        //2022-03-13T08:00:00Z[UTC]
        this.rezervacija.datumRezervacije = `${this.rezervacija.datumRezervacije}T00:00:00Z[UTC]`
        this.rezervacija.idPostaja=this.postajaId
        this.rezervacija.idUporabnik = 1 //hardcoded za demonstracijo
        this.rezervacija.uraKonca = `1970-01-01T${this.rezervacija.uraKonca}:00Z[UTC]`
        this.rezervacija.uraZacetka = `1970-01-01T${this.rezervacija.uraZacetka}:00Z[UTC]`

        let rezFix = new Rezervacija()

        rezFix.datumRezervacije = this.rezervacija.datumRezervacije
        rezFix.idPostaja = this.rezervacija.idPostaja
        rezFix.idUporabnik= this.rezervacija.idUporabnik 
        rezFix.uraKonca= this.rezervacija.uraKonca
        rezFix.uraZacetka= this.rezervacija.uraZacetka

        //"{\"datumRezervacije\":\"2022-07-13T08:00:00Z[UTC]\",\"idPostaja\":2,\"idUporabnik\":1,\"uraKonca\":\"1970-01-01T12:00:00Z[UTC]\",\"uraZacetka\":\"1970-01-01T14:00:00Z[UTC]\"}
        //{"datumRezervacije":"2022-01-15T00:00:00Z[UTC]","idPostaja":1,"idUporabnik":1,"uraKonca":"1970-01-01T06:06:00Z[UTC]","uraZacetka":"1970-01-01T05:05:00Z[UTC]"}


        console.log(JSON.stringify(rezFix))
        this.rezervacijeService.create(rezFix).subscribe()
        
    }

    nazaj(): void {
        this.router.navigate(['/postaje/'+ this.postajaId]);
    }

}
