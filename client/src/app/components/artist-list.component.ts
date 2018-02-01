import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { Global } from '../services/global';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artst.service';

@Component({
    selector: 'artist-list',
    templateUrl: '../views/artist-list.html',
    providers: [UserService, ArtistService]
})

export class ArtistLstComponent implements OnInit {

    public titulo: string;
    public artist: Artist[];
    public url: string;
    public identity;
    public token;
    public next_page;
    public prev_page;
    public artists;

    constructor(
        private _route: Router,
        private _router: ActivatedRoute,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = Global.url;
        this.next_page = 1;
        this.prev_page = 1;
        this.artists = "";
        this.getArtists();
    }

    ngOnInit() {
        console.log('Artist-list.component.ts cargado');
       
        // Conseguir el listado de artistas
    }

    getArtists() {

        this._router.params.forEach((params: Params) => {
            //Anteponiendo el signo + convierto el valor en un número....
            let page = +params['page'];

            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;
                if (this.prev_page == 0) {
                    this.prev_page = page - 1;
                }
            }

            this._artistService.geArtists(this.token, page).subscribe(

                response => {
                    console.log(response.artists);
                    this.artists = response.artists;
                },
                err => {
                    err => {
                        console.log(err);
                        let errorMessage = <any>err;
                        if (errorMessage != null) {
                            let body = JSON.parse(err._body);
                            //this.errorMessage = body.message;
                            console.log(body.message);
                        }
                    }
                }
            )
        });
    }

}