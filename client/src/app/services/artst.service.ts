import { Injectable } from '@angular/core'; //  Inyectar los servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; // Realizar peticiones
import 'rxjs/add/operator/map'; // Mapear datos ú objetos
import { Observable } from 'rxjs/Observable'; // recoger las respuestas de las peticiones
import { Global } from './global';
import { element } from 'protractor';
import { Artist } from '../models/artist';

@Injectable()

export class ArtistService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = Global.url;
    }

    addArtist(token, artist: Artist) {

        let json = JSON.stringify(artist);
        let params = json;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'artist', params, { headers: headers }).map(res => res.json());
    }

    geArtists(token, page) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.url + 'artists/' + page, options)
            .map(res => res.json());
    }

    getArtist(token, id: string) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.url + 'artist/' + id, options)
            .map(res => res.json());
    }

    editArtist(token, id: string, artist: Artist) {

        let json = JSON.stringify(artist);
        let params = json;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'artist/' + id, params, { headers: headers }).map(res => res.json());
    }

    deleteArtist(token, id: string) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.delete(this.url + 'artist/' + id, { headers:headers })
            .map(res => res.json());
    }
}

