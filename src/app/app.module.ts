import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SeznamiComponent} from './seznami/seznami.component';
import {ArtikelDodajComponent} from './seznami/artikel-dodaj.component';
import {SeznamPodrobnostiComponent} from './seznami/seznam-podrobnosti.component';
import {SeznamiService} from './seznami/services/seznami.service';

import { PostajeComponents } from './seznami/postaje.components';
import { PostajeService } from './seznami/services/postaje.service';

import { PostajePodrobnostiComponent } from './seznami/postaje-podrobnosti.component';
import { RezervacijeService } from './seznami/services/rezervacije.service';
import { OceneService } from './seznami/services/ocene.service';
import { UporabnikiService } from './seznami/services/uporabniki.service';
import { RezervacijeDodajComponent } from './seznami/rezervacija-dodaj.component';

import { RezervacijePregledComponent } from './seznami/rezervacije-pregled-component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        SeznamiComponent,
        SeznamPodrobnostiComponent,
        
        RezervacijeDodajComponent,
        PostajeComponents,
        PostajePodrobnostiComponent,
        RezervacijePregledComponent,

        ArtikelDodajComponent
    ],
    providers: [SeznamiService, PostajeService, RezervacijeService, OceneService, UporabnikiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

