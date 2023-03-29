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
import {MatMenuModule} from "@angular/material/menu";
import { PostPopUpViewComponent } from './parts/post-view/post-pop-up-view/post-pop-up-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PerceptionBarViewComponent } from './parts/post-view/perception-bar-view/perception-bar-view.component';
import { NewPostViewComponent } from './parts/post-view/new-post-view/new-post-view.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AttachmentViewComponent } from './parts/post-view/attachment-view/attachment-view.component';
import { FigureViewComponent } from './parts/figure-view/figure-view.component';

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
    UserViewComponent,
    PostPopUpViewComponent,
    PerceptionBarViewComponent,
    NewPostViewComponent,
    AttachmentViewComponent,
    FigureViewComponent,
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
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
