import { Injectable } from '@angular/core'; //  Inyectar los servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; // Realizar peticiones
import 'rxjs/add/operator/map'; // Mapear datos ú objetos
import { Observable } from 'rxjs/Observable'; // recoger las respuestas de las peticiones
import { Global } from './global';
import { Artist } from '../models/artist';

@Injectable()

export class UploadService {

    public url;

    constructor(private _http: Http) {
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
        
        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }

                    else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}
