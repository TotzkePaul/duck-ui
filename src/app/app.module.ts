import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DuckListComponent } from './duck-list/duck-list.component';
import { DuckService } from './ducks-api.service';

@NgModule({
  declarations: [
    AppComponent,
    DuckListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DuckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
