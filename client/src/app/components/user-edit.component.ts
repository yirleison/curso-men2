
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { setInterval } from 'timers';
import { promise } from 'selenium-webdriver';
import { Global } from '../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService],
    styleUrls: ['../styles/user.css'],
})

export class UserEditComponent {
    public titulo: string;
    public user: User;
    public token;
    public identity;
    public alertUpdate;
    public fileToUpload: Array<File>;
    public url;

    constructor(
        private _userService: UserService
    ) {
        //LocalStorage...
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = Global.url;
        this.titulo = 'Actalizar mis datos';
    }

    ngOnInit() {
        console.log('user-edit.component cargado');
    }

    onSubmitUpdate() {
        this._userService.updateUser(this.user).subscribe(
            response => {
                this.user = response.user;
                if (!response.user) {
                    this.alertUpdate = 'El usuario no se ha podido actualizar';
                }
                else {
                    this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById('name_user').innerHTML = this.user.name;
                    var image_path = this.url + 'get-image-user/' + this.user.image;
                    document.getElementById('image_logged').setAttribute('src', image_path);

                    if (!this.fileToUpload) {
                        // Redirecciono
                    }

                    else {
                        this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.fileToUpload).then(

                            (result: any) => {
                                this.user.image = result.image;
                                localStorage.setItem('identity', JSON.stringify(this.user));
                                //Actualizo la imagen de perfil modificando el atributo src con la nueva img...
                                var image_path = this.url + 'get-image-user/' + this.user.image;
                                document.getElementById('image_logged').setAttribute('src', image_path);
                            }

                        );
                    }
                    this.alertUpdate = 'Datos actualizados correctamente';
                }
            },

            error => {
                if (error) {
                    let errorMessage = <any>error;
                    if (errorMessage != null) {
                        let body = JSON.parse(error._body);
                        this.alertUpdate = body.message;
                        console.log(body.message);
                    }
                }
            }
        )
    }

    // Recojo la información del archivo a subir con el evento change...
    fileChangeEvent(fileInput: any) {
        this.fileToUpload = <Array<File>>fileInput.target.files;
        console.log(this.fileToUpload);
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        var token = this.token;

        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
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
