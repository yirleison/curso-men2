import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { Global } from '../services/global';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artst.service';
@Component({
    selector: 'artist-add',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtisAddComponent implements OnInit {

    public titulo: string;
    public artist: Artist;
    public url: string;
    public identity;
    public token;
    public alertMessage;

    constructor(
        private _route: Router,
        private _router: ActivatedRoute,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.artist = new Artist('', '', '');
    }

    ngOnInit() {

        // Conseguir el listado de artistas
    }

    saveArtist() {
        this._artistService.addArtist(this.token, this.artist).subscribe(
            response => {
               
                if(!response.artist){
                    this.alertMessage = "Error en el servidor";
                }
                else {
                    this.artist = response.artist;
                    this.alertMessage = "El artista se ha creado correctamente";
                    this.artist = new Artist('', '', '');
                    this._route.navigate(['/editar-artista',response.artist._id]);
                }
            },
            err => {
                console.log(err);
                let errorMessage = <any>err;
                if (errorMessage != null) {
                    let body = JSON.parse(err._body);
                    //this.errorMessage = body.message;
                    console.log(body.message);
                }
            }
        )
    }

}