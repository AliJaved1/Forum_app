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
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import { PostListViewComponent } from './content-view/post-list-view/post-list-view.component';
import { PostViewComponent } from './parts/post-view/post-view.component';
import { ContentOptionViewComponent } from './content-view/content-option-view/content-option-view.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";
import { UserViewComponent } from './parts/user-view/user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LogoViewComponent,
    UserActionViewComponent,
    ContentViewComponent,
    UserInfoViewComponent,
    PostListViewComponent,
    PostViewComponent,
    ContentOptionViewComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
