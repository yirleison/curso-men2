import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { Global } from '../services/global';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artst.service';
import { UploadService } from '../services/upload.service';
import { resolve } from 'dns';

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService, UploadService]
})

export class ArtisEditComponent implements OnInit {

    public titulo: string;
    public artist: Artist;
    public url: string;
    public identity;
    public token;
    public alertMessage;
    public is_edit;
    public filesToUpload: Array<File>;

    constructor(
        private _route: Router,
        private _router: ActivatedRoute,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _uploadService: UploadService
    ) {
        this.url = Global.url;
        this.titulo = 'editar artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.artist = new Artist('', '', '');
        this.is_edit = true;
    }

    ngOnInit() {

        // Llamar al metodo del api para obtener un artista de acuerdo a su id..
        this.getArtist();
    }

    getArtist() {
        this._router.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(

                response => {
                    if (!response.artist) {
                        this._route.navigate(['/']);
                    }
                    else {
                        this.artist = response.artist;
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
        });
    }

    onSubmit() {
        this._router.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.editArtist(this.token, id, this.artist).subscribe(
                response => {

                    if (!response.artistUpdate) {
                        this.alertMessage = "Error en el servidor";
                    }
                    else {
                        this.artist = response.artistUpdate;
                        this.alertMessage = "El artista se ha actualizado correctamente";
                        // Subir la imagen del artista....

                        this._uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id, [], this.filesToUpload, this.token, 'name')
                            .then(
                            resolve => {
                                if (resolve) {
                                    this._route.navigate(['artist', 1]);
                                }
                            },

                            error => {
                                console.log(error)
                            }
                            )
                        //this.artist = new Artist('', '', '');
                        //this._route.navigate(['/editar-artista',response.artist._id]);
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
        })
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}