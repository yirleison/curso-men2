import { Injectable } from '@angular/core'; //  Inyectar los servicios
import { Http, Response, Headers } from '@angular/http'; // Realizar peticiones
import 'rxjs/add/operator/map'; // Mapear datos ú objetos
import { Observable } from 'rxjs/Observable'; // recoger las respuestas de las peticiones
import { Global } from './global';
import { element } from 'protractor';

@Injectable()

export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = Global.url;
    }

    signUp(user, gethash = null) {

        if (gethash != null) {
            user.gethash = gethash;
        }
        let json = JSON.stringify(user);
        let params = json;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'login', params, { headers: headers })
            .map(res => res.json());
    }

    register(user_to_register) {

        let json = JSON.stringify(user_to_register);
        let params = json;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'register', params, { headers: headers })
            .map(res => res.json());
    }

    updateUser(user_to_update) {
        let json = JSON.stringify(user_to_update);
        let params = json;
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            }
        );

        return this._http.put(this.url + 'update-user/' + user_to_update._id, params, { headers: headers })
            .map(res => res.json());
    }

    getIdentity() {

        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != 'undefined') {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {

        let token = localStorage.getItem('token');
        if (token != 'undefined') {
            this.token = token;
        }
        else {
            this.token = null;
        }

        return this.token;

    }

}