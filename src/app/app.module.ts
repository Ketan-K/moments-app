import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MomentsListComponent } from './moments-list/moments-list.component';
import { MomentsComponent } from './moments/moments.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DndDirective } from './dnd.directive';
import { ProgressComponent } from './progress/progress.component';
import { MomentsTableComponent } from './moments-table/moments-table.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, SignUpComponent, AuthNavbarComponent, HomeComponent, MomentsListComponent, MomentsComponent, FileUploadComponent, DndDirective, ProgressComponent, MomentsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
