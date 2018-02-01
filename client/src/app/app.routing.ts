import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importo los componentes..

import { UserEditComponent } from './components/user-edit.component';

// Artist
import { ArtistLstComponent } from './components/artist-list.component';
//Home
import { HomeComponent } from './components/home.component';
// AddArtist
import { ArtisAddComponent } from './components/artist-add.component';
// EditArtist
import { ArtisEditComponent } from './components/artis-edit.component';

// Defino el arreglo de rutas

const appRutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', component: ArtistLstComponent },
    { path: 'crear-artista', component: ArtisAddComponent },
    { path: 'editar-artista/:id', component: ArtisEditComponent },
    { path: 'artist/:page', component: ArtistLstComponent },
    { path: 'mis-datos', component: UserEditComponent },
    { path: '**', component: HomeComponent }
]

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRutes);
