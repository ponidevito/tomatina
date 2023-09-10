import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';





import { SharedModule } from '../app/shared/shared.module';
import { CapitalizePipe } from './shared/pipes/capitalize/capitalize.pipe';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    HttpClientModule,
    
    

  ],
  exports: [
    CapitalizePipe,
    HeaderComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
