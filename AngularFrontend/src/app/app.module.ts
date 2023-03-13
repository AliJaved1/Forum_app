import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { LogoViewComponent } from './logo-view/logo-view.component';
import { UserActionViewComponent } from './user-action-view/user-action-view.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { UserInfoViewComponent } from './user-info-view/user-info-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LogoViewComponent,
    UserActionViewComponent,
    ContentViewComponent,
    UserInfoViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
