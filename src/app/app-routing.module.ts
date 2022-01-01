import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SeznamiComponent} from './seznami/seznami.component';
import {SeznamPodrobnostiComponent} from './seznami/seznam-podrobnosti.component';
import { ArtikelDodajComponent } from './seznami/artikel-dodaj.component';

import { PostajeComponents } from './seznami/postaje.components';
import { PostajePodrobnostiComponent } from './seznami/postaje-podrobnosti.component';

import { RezervacijeDodajComponent } from './seznami/rezervacija-dodaj.component';
import { RezervacijePregledComponent } from './seznami/rezervacije-pregled-component';

//TODO ZBRISI NEPOTREBNE
const routes: Routes = [
    //{path: '', redirectTo: '/seznami', pathMatch: 'full'},
    {path: 'seznami', component: SeznamiComponent},
    {path: 'seznami/:id', component: SeznamPodrobnostiComponent},
    {path: 'seznami/:id/dodaj', component: ArtikelDodajComponent},

    {path: '', redirectTo: '/postaje', pathMatch: 'full'},
    {path: 'postaje', component: PostajeComponents},
    {path: 'postaje/:id', component: PostajePodrobnostiComponent},
    {path: 'rezervacije/:id', component: RezervacijePregledComponent},
    {path: 'postaje/:id/dodaj', component: RezervacijeDodajComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
