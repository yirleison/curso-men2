import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

//Componentes nuevos

import { UserEditComponent } from './components/user-edit.component';
import { ArtistLstComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtisAddComponent } from './components/artist-add.component';
import { ArtisEditComponent } from './components/artis-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistLstComponent,
    HomeComponent,
    ArtisAddComponent,
    ArtisEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
