import { Injectable } from '@angular/core'; //  Inyectar los servicios
import { Http, Response, Headers } from '@angular/http'; // Realizar peticiones
import 'rxjs/add/operator/map'; // Mapear datos ú objetos
import { Observable } from 'rxjs/Observable'; // recoger las respuestas de las peticiones
import { Global } from './global';

@Injectable()

export class UserService {

    public url: string;

    constructor(private _http: Http){
        this.url = Global.url;
    }

    signUp() {
        
        return "Hola mundo desde el serviico";
    }

}